import { Region } from "@/graphql/graphql";
import { Levels } from "./arrays";

export function CreateRegionsList() {
  return Object.values(Region)
    .map((value, i) => ({ node: { name: value, value, id: i }, level: Levels[0] }))
}