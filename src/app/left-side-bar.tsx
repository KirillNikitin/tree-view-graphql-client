'use client';

import { CreateRegionsList } from "@/consts/lists";
import { Workflow, Folder, Layout } from "lucide-react";
import React, { useEffect } from "react";
import { Tree } from "./recursive-tree-client";
import { findInArray, validateName } from "./helpers/functions";
import { parseAsString } from "nuqs";
import { url } from "inspector";
import { useSearchParams } from "next/navigation";
import { fetchDataByQuery } from "@/api";
import {
  citiesQueryByStateId,
  countriesQueryByRegion,
  stateQueryBy_StateCode_and_CountryCode,
  statesQueryByCountryId
} from "@/graphql/queries";
import { Region } from "@/graphql/graphql";
import { Levels } from "@/consts/arrays";

type RegionFieldToUpdate = {
  level: string,
  children?: any[],
  node: {
    name: Region;
    value: Region;
    edges?: any[];
  }
} | undefined

export default function LeftSideBar({ ...props }) {

  //let data = CreateRegionsList();
  /*let regionsList = [
    { id: '1', name: "Africa" },
    {
      id: '2', name: "Asia",
      children: [
        { id: 'c1', name: "Benin" },
        { id: 'c2', name: "Botswana" },
      ]
    },

  ]*/

  /*const data = [
    { id: "1", name: "Unread" },
    { id: "2", name: "Threads" },
    {
      id: "3",
      name: "Chat Rooms",
      children: [
        { id: "c1", name: "General" },
        { id: "c2", name: "Random" },
        { id: "c3", name: "Open Source Projects" },
      ],
    },
    {
      id: "4",
      name: "Direct Messages",
      children: [
        {
          id: "d1",
          name: "Alice",
          children: [
            { id: "d11", name: "Alice2", icon: Layout },
            { id: "d12", name: "Bob2" },
            { id: "d13", name: "Charlie2" },
          ],
        },
        { id: "d2", name: "Bob", icon: Layout },
        { id: "d3", name: "Charlie" },
      ],
    },
    {
      id: "5",
      name: "Direct Messages",
      children: [
        {
          id: "e1",
          name: "Alice",
          children: [
            { id: "e11", name: "Alice2" },
            { id: "e12", name: "Bob2" },
            { id: "e13", name: "Charlie2" },
          ],
        },
        { id: "e2", name: "Bob" },
        { id: "e3", name: "Charlie" },
      ],
    },
    {
      id: "6",
      name: "Direct Messages",
      children: [
        {
          id: "f1",
          name: "Alice",
          children: [
            { id: "f11", name: "Alice2" },
            { id: "f12", name: "Bob2" },
            { id: "f13", name: "Charlie2" },
          ],
        },
        { id: "f2", name: "Bob" },
        { id: "f3", name: "Charlie" },
      ],
    },
  ];*/

  const [data, setData] = React.useState(CreateRegionsList());
  const [selectedItemId, setSelectedItemId] = React.useState<string | Number | undefined>()


  const searchParams = useSearchParams();
  const region = searchParams.get('region');
  const country = searchParams.get('country');
  const state = searchParams.get('state');
  const city = searchParams.get('city');

  async function getTreeDataByUrlParams() {

    let regionFieldToUpdate: RegionFieldToUpdate;

    if (region) {
      const countriesData = await fetchDataByQuery(countriesQueryByRegion(region));
      regionFieldToUpdate = data.find(i => i.node.name === region);
      regionFieldToUpdate!.children = countriesData.data?.countries.edges;
      regionFieldToUpdate!.children?.forEach((item: { level: any; }) => item.level = Levels[1]);
      setSelectedItemId(regionFieldToUpdate?.node.name);
      if (country) {
        const countryData = findInArray(regionFieldToUpdate?.children!, country)
        const statesData = await fetchDataByQuery(statesQueryByCountryId(countryData.node.id));
        countryData.children = statesData.data?.states?.edges;
        countryData.children?.forEach((item: { level: string; }) => item.level = Levels[2]);
        setSelectedItemId(countryData.node.id);
        if (state) {
          const stateData = findInArray(countryData?.children!, state)
          const fullStateData = await fetchDataByQuery(
            stateQueryBy_StateCode_and_CountryCode(stateData.node.state_code, stateData.node.country_code));
          const citiesData = await fetchDataByQuery(
            citiesQueryByStateId(fullStateData.data.state.id, stateData.node.country_code, 30));

          stateData.children = citiesData.data.cities.edges;
          setSelectedItemId(stateData.node.id);
        }
      }
      setData(data);
    }

  }

  useEffect(() => {
    getTreeDataByUrlParams();
  }, [])

  return <>
    <section className="left-sidebar w-[400px] font-normal border-r p-4 text-primary dark:text-slate-100 dark:font-extralight">
      <Tree
        className="flex-shrink-0 w-[380] h-full border-[1px]"
        data={data}
        initialSlelectedItemId={selectedItemId}
        onSelectChange={(item) => {
          setData(data);
        }}
        folderIcon={Folder}
        itemIcon={Workflow} />
    </section>
  </>
}

