import { get } from '@/utils/request'
var businessCtg = null
var materialCtg = null
var supplyRegion = null
var region = null
var city = null

export async function businessCtgList() {
  if (!businessCtg) {
    var res = await get('/keywordQuery/businessCtg')
    businessCtg = res.data.objectList
  }
  return businessCtg
}

export async function materialCtgList() {
  if (!materialCtg) {
    var res = await get('/keywordQuery/materialCtg')
    materialCtg = res.data.objectList
  }
  return materialCtg
}

export async function supplyRegionList() {
  if (!supplyRegion) {
    var res = await get('/keywordQuery/supplyRegion')
    supplyRegion = res.data.objectList
  }
  return supplyRegion
}

export async function regionList() {
  if (!region) {
    var res = await get('/keywordQuery/region')
    region = res.data.objectList
  }
  return region
}

export async function cityList() {
  if (!city) {
    var res = await get('/keywordQuery/city')
    city = res.data.objectList
  }
  return city
}
