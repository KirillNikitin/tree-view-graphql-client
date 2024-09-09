"use client";

import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils";
import { ChevronRight, type LucideIcon } from "lucide-react";
import useResizeObserver from "use-resize-observer";
import { fetchDataByQuery } from "@/api";
import {
  citiesQueryByStateId,
  countriesQueryByRegion,
  stateQueryBy_StateCode_and_CountryCode,
  statesQueryByCountryId
} from "@/graphql/queries";
import { Levels } from "@/consts/arrays";
import { parseAsInteger, useQueryState } from "nuqs";
import { filterArr, validateName } from "./helpers/functions";
import { useSearchParams } from "next/navigation";


interface TreeDataItem {
  level: string;
  node: {
    id: Number;
    name: string;
    state_code: string;
    country_code: string;
  };
  id?: string;
  name?: string;
  icon?: LucideIcon,
  children?: TreeDataItem[];
}

type TreeProps =
  React.HTMLAttributes<HTMLDivElement> &
  {
    data: TreeDataItem[] | TreeDataItem,
    initialSlelectedItemId?: string,
    onSelectChange?: (item: TreeDataItem | undefined, data: TreeDataItem[] | TreeDataItem) => void,
    expandAll?: boolean,
    folderIcon?: LucideIcon,
    itemIcon?: LucideIcon
  }

const Tree = React.forwardRef<
  HTMLDivElement,
  TreeProps
>(({
  data, initialSlelectedItemId, onSelectChange, expandAll,
  folderIcon,
  itemIcon,
  className, ...props
}, ref) => {
  const [selectedItemId, setSelectedItemId] = React.useState<string | Number | undefined>(initialSlelectedItemId)
  const [region, setRegion] = useQueryState('region', { defaultValue: '' });
  const [country, setCountry] = useQueryState('country', { defaultValue: '' });
  const [state, setState] = useQueryState('state', { defaultValue: '' });
  const [city, setCity] = useQueryState('city', { defaultValue: '' });

  const searchParams = useSearchParams();

  const handleSelectChange = React.useCallback(async (item: TreeDataItem | undefined) => {
    if (!item!.children) {
      let region = filterArr(data, item!.node?.name)[0];
      switch (item!.level) {
        case 'Cities':
          if (region.node.name != searchParams.get('region')) setRegion(region.node.name);
          let citiesCountry = filterArr(region.children, item!.node?.name)[0]
          if (citiesCountry.node.name != searchParams.get('country')) setCountry(citiesCountry.node.name);
          let citiesState = filterArr(citiesCountry.children, item!.node?.name)[0]
          if (citiesState.node.name != searchParams.get('state')) setState(citiesState.node.name);
          setCity(validateName(item!.node?.name));
          break;

        case 'States':
          const fullStateInfo = await fetchDataByQuery(
            stateQueryBy_StateCode_and_CountryCode(item?.node?.state_code, item?.node?.country_code));

          const stateData = fullStateInfo.data.state;
          const citiesData = await fetchDataByQuery(
            citiesQueryByStateId(stateData.id, item!.node.country_code, 30));
          item!.children = citiesData.data.cities.edges;
          item!.children?.forEach((item) => item.level = Levels[3]);
          setSelectedItemId(item!.node?.name);
          if (region.node.name != searchParams.get('region')) setRegion(region.node.name);
          let statesCountry = filterArr(region.children, item!.node?.name)[0]
          if (statesCountry.node.name != searchParams.get('country')) setCountry(statesCountry.node.name);
          setState(validateName(item!.node?.name));
          setCity(null);
          break;

        case 'Countries':
          const statesData = await fetchDataByQuery(statesQueryByCountryId(item!.node?.id));
          item!.children = statesData.data?.states?.edges;
          item!.children?.forEach((item) => item.level = Levels[2]);
          setSelectedItemId(item!.node?.id);
          if (region.node.name != searchParams.get('region')) setRegion(region.node.name);
          setCountry(item!.node?.name);
          setState(null);
          setCity(null);
          break;

        default:
          const countriesData = await fetchDataByQuery(countriesQueryByRegion(item!.node?.name));
          item!.children = countriesData.data?.countries.edges;
          item!.children?.forEach((item) => item.level = Levels[1]);
          setSelectedItemId(item!.node?.id);
          setRegion(item!.node?.name);
          setCountry(null);
          setState(null);
          setCity(null);
      }
    }
    if (onSelectChange) {
      onSelectChange(item, data)
    }
  }, [onSelectChange]);

  const expandedItemIds = React.useMemo(() => {
    if (!initialSlelectedItemId) {
      return [] as string[]
    }

    const ids: string[] = []

    function walkTreeItems(items: TreeDataItem[] | TreeDataItem, targetId: string) {
      if (items instanceof Array) {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < items.length; i++) {
          ids.push(items[i]!.id);
          if (walkTreeItems(items[i]!, targetId) && !expandAll) {
            return true;
          }
          if (!expandAll) ids.pop();
        }
      } else if (!expandAll && items.id === targetId) {
        return true;
      } else if (items.children) {
        return walkTreeItems(items.children, targetId)
      }
    }

    walkTreeItems(data, initialSlelectedItemId)
    return ids;
  }, [data, initialSlelectedItemId])

  const { ref: refRoot, width, height } = useResizeObserver();

  return (
    <div ref={refRoot} className={cn("overflow-hidden", className)}>
      <ScrollArea style={{ width, height }}>
        <div className="relative p-2">
          <TreeItem
            data={data}
            ref={ref}
            selectedItemId={selectedItemId}
            handleSelectChange={handleSelectChange}
            expandedItemIds={expandedItemIds}
            FolderIcon={folderIcon}
            ItemIcon={itemIcon}
            {...props}
          />
        </div>
      </ScrollArea>
    </div>
  )
})

type TreeItemProps =
  TreeProps &
  {
    selectedItemId?: Number | string,
    handleSelectChange: (item: TreeDataItem | undefined) => void,
    expandedItemIds: string[],
    FolderIcon?: LucideIcon,
    ItemIcon?: LucideIcon
  }

const TreeItem = React.forwardRef<
  HTMLDivElement,
  TreeItemProps
>(({ className, data, selectedItemId, handleSelectChange, expandedItemIds, FolderIcon, ItemIcon, ...props }, ref) => {
  return (
    <div ref={ref} role="tree" className={className} {...props}>
      <AccordionPrimitive.Root type="single" collapsible>
        <ul>
          {data instanceof Array ? (
            data.map((item) => (
              <li key={(item.id ?? item.node.id) ?? validateName(item.node.name)}>
                {item.children ? (
                  <AccordionPrimitive.Item value={validateName(item.node.name)}>
                    <AccordionTrigger
                      className={cn(
                        "px-2 hover:before:opacity-100 before:absolute before:left-0 before:w-full before:opacity-0 before:bg-muted/80 before:h-[1.75rem] before:-z-10",
                        selectedItemId === ((item.id ?? item.node.id) ?? validateName(item.node.name)) && "before:opacity-100 before:bg-accent text-accent-foreground before:border-l-2 before:border-l-accent-foreground/50 dark:before:border-0"
                      )}
                      onClick={() => handleSelectChange(item)}
                    >
                      {item.icon &&
                        <item.icon
                          className="h-4 w-4 shrink-0 mr-2 text-accent-foreground/50"
                          aria-hidden="true"
                        />
                      }
                      {!item.icon && FolderIcon &&
                        <FolderIcon
                          className="h-4 w-4 shrink-0 mr-2 text-accent-foreground/50"
                          aria-hidden="true"
                        />
                      }
                      <span className="text-sm truncate" >{validateName(item.name ?? item.node.name)}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-6">
                      <TreeItem
                        data={item.children ? item.children : item}
                        selectedItemId={selectedItemId}
                        handleSelectChange={handleSelectChange}
                        expandedItemIds={expandedItemIds}
                        FolderIcon={FolderIcon}
                        ItemIcon={ItemIcon}
                      />
                    </AccordionContent>
                  </AccordionPrimitive.Item>
                ) : (
                  <Leaf
                    item={item}
                    isSelected={selectedItemId === (item.id ?? item.node.id) ?? validateName(item.node.name)}
                    onClick={() => handleSelectChange(item)}
                    Icon={ItemIcon}
                  />
                )}
              </li>
            ))
          ) : (
            <li key={data.id}>
              <Leaf
                item={data}
                isSelected={selectedItemId === (data.id ?? data.node.id) ?? validateName(data.node.name)}
                onClick={() => handleSelectChange(data)}
                Icon={ItemIcon}
              />
            </li>
          )}
        </ul>
      </AccordionPrimitive.Root>
    </div>
  );
})

const Leaf = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    item: TreeDataItem, isSelected?: boolean,
    Icon?: LucideIcon
  }
>(({ className, item, isSelected, Icon, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center py-2 px-2 cursor-pointer \
        hover:before:opacity-100 before:absolute before:left-0 before:right-1 before:w-full before:opacity-0 before:bg-muted/80 before:h-[1.75rem] before:-z-10",
        className,
        isSelected && "before:opacity-100 before:bg-accent text-accent-foreground before:border-l-2 before:border-l-accent-foreground/50 dark:before:border-0"
      )}
      {...props}
    >
      {item.icon && <item.icon className="h-4 w-4 shrink-0 mr-2 text-accent-foreground/50" aria-hidden="true" />}
      {!item.icon && Icon && <Icon className="h-4 w-4 shrink-0 mr-2 text-accent-foreground/50" aria-hidden="true" />}
      <span className="flex-grow text-sm truncate">{validateName(item.name ?? item.node.name)}</span>
    </div>
  );
})

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, forwardedRef) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      className={cn(
        "flex flex-1 w-full items-center py-2 transition-all last:[&[data-state=open]>svg]:rotate-90",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 text-accent-foreground/50 ml-auto" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, forwardedRef) => (
  <AccordionPrimitive.Content

    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="pb-1 pt-0">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Tree, type TreeDataItem }
