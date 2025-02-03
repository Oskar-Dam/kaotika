import { Armor } from "@/_common/interfaces/Armor";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Boot } from "@/_common/interfaces/Boot";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Ring } from "@/_common/interfaces/Ring";
import { Shield } from "@/_common/interfaces/Shield";
import { Weapon } from "@/_common/interfaces/Weapon";

export const filterCategoryData = (data: Weapon[] | Helmet[] | Armor[] | Boot[] | Ring[] | Artifact[] | Shield[]) => {
  let newData: any = [];

  data.map((element: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield) => {
    if (element.value > 0 && !element.isUnique)
      newData = [...newData, element];
  })

  return newData;
}