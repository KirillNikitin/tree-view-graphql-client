import { TreeDataItem } from "../recursive-tree-client";

// function to find region, country, state, city by the name
export function findInArray(arr: any[], val: string) {
  return arr.find((el: { node: { name: String } }) => el.node['name'] === validateName(val))
}

// function to validate a name with non ordinary symbols or spaces
export function validateName(name: string) {
  return decodeURIComponent(name).replace(/%20/g, " ");
}

// function to detect the depth of a object (not in use in this project)
export function objectDepth(o: any): any {
  return Object(o) === o ? 1 + Math.max(-1, ...Object.values(o).map(objectDepth)) : 0
}

// function to return the array (of objects) at the level where the value is found
export function filterArr(array: TreeDataItem | TreeDataItem[], value: unknown) {
  let find = function (object: object) {
    return Object
      .values(object)
      .some(v => v === value || v && typeof v === 'object' && find(v));
  }

  return array.filter(find);
}
