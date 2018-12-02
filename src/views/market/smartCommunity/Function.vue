<template>
</template>
<script>
export default {
  props: ['exprotList'],
  data() {
    return {
      matchInfo: {},
      initProjectReform: [],
      tHeader: [],
      filterVal: [],
      exportData: []
    }
  },
  mounted() {
    this.getMatchInfo()
    this.getInitReformInfo()
  },
  created() {
  },
  watch: {
  },
  methods: {
    // 如果改造信息空置状态，防止该项目没有改造信息，后台返回的为空数组，
    // 不好数据处理，直接用这里的空状态值
    getInitReformInfo() {
      this.initProjectReform = [
        { category: 'jifang', amount: 0 },
        { category: 'buxian', amount: 0, a: '' },
        { category: 'tingchechang', amount: '', a: '', b: '', c: '', d: '' },
        { category: 'menjin', amount: 0, a: '', b: '' },
        { category: 'fangke', amount: 0, a: '', b: '' },
        { category: 'tikong', amount: 0, a: '', b: '' },
        { category: 'yuntong', amount: 0, a: '', b: '', c: '' },
        { category: 'xungeng', amount: 0, a: '', b: '' },
        { category: 'zhoujie', amount: 0, a: '', b: '' },
        { category: 'yunduijiang', amount: 0, a: '', b: '', c: '' },
        { category: 'xinxifabu', amount: 0, a: '', b: '' },
        { category: 'bjyinyue', amount: 0, a: '', b: '' },
        { category: 'jifangjk', amount: 0, a: '', b: '' },
        { category: 'diantijk', amount: 0, a: '', b: '' },
        { category: 'LED', amount: 0, a: '' },
        { category: 'shuibengjn', amount: 0, a: '' },
        { category: 'kongdiaojn', amount: 0, a: '' },
        { category: 'shebeiqw', amount: 0, a: '', startDte: null, endDate: null },
        { category: 'diantiqw', amount: 0, a: '', startDate: null, endDate: null },
        { category: 'diantijg', amount: 0, a: '', startDate: null, endDate: null },
        { category: 'shebijy', amount: 0, a: '', b: '' }
      ]
    },
    // 表单头部标题数组，数据过滤字段数组
    getMatchInfo() {
      this.matchInfo = {
        1: '序号',
        2: '公司名称',
        3: '城市',
        4: '办事处',
        5: '管理处名称',
        6: '管理处地址',
        7: '楼栋及单元数量',
        8: '总户数',
        9: '首期入伙时间',
        10: '总收费面积',
        11: '总占地面积',
        12: '总建筑面积',
        13: '容积率',
        14: '建筑业态',
        15: '物业管理费',
        16: '小区类型',
        17: '合约模式',
        18: '车位总数',
        19: '车位比',
        20: '地面车位数量',
        21: '地面车位收费标准',
        22: '地库车位数量',
        23: '地库车位收费标准',
        24: '人防车位数量',
        25: '人防车位收费标准',
        26: '小区配套',
        27: '车行_外围入口',
        28: '车行_外围出口',
        29: '车行_地库入口',
        30: '车行_地库出口',
        31: '车行_园区入口',
        32: '车行_园区出口',
        33: '人行_业主入口',
        34: '人行_业主出口',
        35: '人行_访客入口',
        36: '人行_访客出口',
        37: '人行_消防入口',
        38: '人行_消防出口',
        39: '电梯_客梯数量',
        40: '电梯_货梯数量',
        41: '安全_视频监控_重点岗位',
        42: '安全_视频监控_重点点位',
        43: '安全_电子巡更',
        44: '安全_围墙周长',
        45: '机房_电梯机房',
        46: '机房_配电房',
        47: '机房_水泵房',
        48: '机房_空调机房',
        49: '机房_暖通机房',
        50: '节能_LED灯_地库',
        51: '节能_LED灯_楼道',
        52: '节能_水泵',
        53: '节能_空调',
        54: '监控中心',
        55: '客服中心',
        56: '会所',
        57: '年份',
        58: '总体投入金额',
        59: '机房工程_投入金额',
        60: '综合布线工程_改造数量',
        61: '综合布线工程_投入金额',
        62: '停车场_改造数量',
        63: '停车场_几进几出',
        64: '停车场_投入金额',
        65: '停车场_品牌',
        66: '停车场_改造方式',
        67: '门禁_改造数量',
        68: '门禁_投入金额',
        69: '门禁_品牌',
        70: '访客_改造数量',
        71: '访客_投入金额',
        72: '访客_品牌',
        73: '梯控_改造数量',
        74: '梯控_投入金额',
        75: '梯控_品牌',
        76: '云瞳_改造岗位数',
        77: '云瞳_改造点位数',
        78: '云瞳_投入金额',
        79: '云瞳_品牌',
        80: '电子巡更_改造数量',
        81: '电子巡更_投入金额',
        82: '电子巡更_品牌',
        83: '周界防范_改造数量',
        84: '周界防范_投入金额',
        85: '周界防范_品牌',
        86: '云对讲_改造围墙机数量',
        87: '云对讲_改造门口机数量',
        88: '云对讲_投入金额',
        89: '云对讲_品牌',
        90: '信息发布_改造数量',
        91: '信息发布_投入金额',
        92: '信息发布_品牌',
        93: '背景音乐_改造数量',
        94: '背景音乐_投入金额',
        95: '背景音乐_品牌',
        96: '机房监控_改造数量',
        97: '机房监控_投入金额',
        98: '机房监控_品牌',
        99: '电梯监控_改造数量',
        100: '电梯监控_投入金额',
        101: '电梯监控_品牌',
        102: 'LED节能_改造数量',
        103: 'LED节能_投入金额',
        104: '水泵节能_改造数量',
        105: '水泵节能_投入金额',
        106: '空调节能_改造数量',
        107: '空调节能_投入金额',
        108: '设备运维_合约起止日',
        109: '设备运维_项目面积（平方米）',
        110: '设备运维_投入金额（元）',
        111: '电梯全委_合约起止日',
        112: '电梯全委_电梯数量（个）',
        113: '电梯全委_投入金额（元）',
        114: '电梯监管_合约起止日',
        115: '电梯监管_电梯数量（个）',
        116: '电梯监管_投入金额（元）',
        117: '设备查验_合约起止日',
        118: '设备查验_项目面积（平方米）',
        119: '设备查验_投入金额'
      }
      this.filterVal = Object.keys(this.matchInfo)
      this.tHeader = []
      this.filterVal.forEach((item) => {
        this.tHeader.push(this.matchInfo[item])
      })
    },
    // 根据后台返回字段，重构数组，单个项目区分年份，生成多条数组
    drawList(exportList) {
      this.exportList = exportList
      var list = []
      this.exportList.forEach((item) => {
        if (item.projectReforms.length > 0) {
          item.projectReforms.forEach((subItem) => {
            var obj = {
              amount: subItem.amount,
              year: subItem.year,
              basic: item,
              projectDesigns: item.projectDesigns,
              projectReformDetailes: subItem.projectReformDetailes
            }
            list.push(obj)
          })
        } else {
          var obj = {
            year: '',
            amount: '',
            basic: item,
            projectDesigns: item.projectDesigns,
            projectReformDetailes: this.initProjectReform
          }
          list.push(obj)
        }
      })
      // console.log(list)
      this.drawNewList(list)
    },
    // 重构的数组对应到表单数据格式，表头字段与过滤字段一一对应
    drawNewList(list) {
      var newList = []
      var index = 1
      list.forEach((item) => {
        var chexing, renxing, anquan, jieneng, dianti, jifang, other
        item.projectDesigns.forEach((i) => {
          switch (i.category) {
            case 'chexing':
              chexing = i
              break
            case 'renxing':
              renxing = i
              break
            case 'anquan':
              anquan = i
              break
            case 'jieneng':
              jieneng = i
              break
            case 'dianti':
              dianti = i
              break
            case 'jifang':
              jifang = i
              break
            case 'other':
              other = i
              break
            default:
          }
        })
        var jifanggc, buxian, tingchechang, menjin, fangke, tikong, yuntong,
          xungeng, zhoujie, yunduijiang, xinxifabu, bjyinyue, jifangjk, diantijk,
          LED, shuibengjn, kongdiaojn, shebeiqw, diantiqw, diantijg, shebijy
        item.projectReformDetailes.forEach((j) => {
          switch (j.category) {
            case 'jifang':
              jifanggc = j
              break
            case 'buxian':
              buxian = j
              break
            case 'tingchechang':
              tingchechang = j
              break
            case 'menjin':
              menjin = j
              break
            case 'fangke':
              fangke = j
              break
            case 'tikong':
              tikong = j
              break
            case 'yuntong':
              yuntong = j
              break
            case 'xungeng':
              xungeng = j
              break
            case 'zhoujie':
              zhoujie = j
              break
            case 'yunduijiang':
              yunduijiang = j
              break
            case 'xinxifabu':
              xinxifabu = j
              break
            case 'bjyinyue':
              bjyinyue = j
              break
            case 'jifangjk':
              jifangjk = j
              break
            case 'diantijk':
              diantijk = j
              break
            case 'LED':
              LED = j
              break
            case 'shuibengjn':
              shuibengjn = j
              break
            case 'kongdiaojn':
              kongdiaojn = j
              break
            case 'shebeiqw':
              shebeiqw = j
              break
            case 'diantiqw':
              diantiqw = j
              break
            case 'diantijg':
              diantijg = j
              break
            case 'shebijy':
              shebijy = j
              break
            default:
          }
        })
        var k = item.basic
        var obj = {
          1: index++,
          2: k.client.name,
          3: k.city.name,
          4: k.region.name,
          5: k.name,
          6: k.address,
          7: k.buildNum,
          8: k.roomNum,
          9: k.firstEntry,
          10: k.chargeArea,
          11: k.landArea,
          12: k.builtArea,
          13: k.volumetricRate,
          14: k.archFormat,
          15: k.manageFee,
          16: k.communityType,
          17: k.contractMode,
          18: k.parkingNum,
          19: k.carRatio,
          20: k.groundParkingNum,
          21: k.groundParkingFee,
          22: k.basementParkingNum,
          23: k.basementParkingFee,
          24: k.defenseParkingNum,
          25: k.defenseParkingFee,
          26: k.facilityWord,
          27: chexing.a,
          28: chexing.a1,
          29: chexing.b,
          30: chexing.b1,
          31: chexing.c,
          32: chexing.c1,
          33: renxing.a,
          34: renxing.a1,
          35: renxing.b,
          36: renxing.b1,
          37: renxing.c,
          38: renxing.c1,
          39: dianti.a,
          40: dianti.a1,
          41: anquan.a,
          42: anquan.a1,
          43: anquan.b,
          44: anquan.b1,
          45: jifang.a,
          46: jifang.a1,
          47: jifang.b,
          48: jifang.b1,
          49: jifang.c,
          50: jieneng.a,
          51: jieneng.a1,
          52: jieneng.b,
          53: jieneng.b1,
          54: other.a,
          55: other.b,
          56: other.c,
          57: item.year,
          58: item.account,
          59: jifanggc.amount,
          60: buxian.a,
          61: buxian.amount,
          62: tingchechang.a,
          63: tingchechang.b,
          64: tingchechang.amount,
          65: tingchechang.c,
          66: tingchechang.d,
          67: menjin.a,
          68: menjin.amount,
          69: menjin.b,
          70: fangke.a,
          71: fangke.amount,
          72: fangke.b,
          73: tikong.a,
          74: tikong.amount,
          75: tikong.b,
          76: yuntong.a,
          77: yuntong.b,
          78: yuntong.amount,
          79: yuntong.c,
          80: xungeng.a,
          81: xungeng.amount,
          82: xungeng.b,
          83: zhoujie.a,
          84: zhoujie.amount,
          85: zhoujie.b,
          86: yunduijiang.a,
          87: yunduijiang.b,
          88: yunduijiang.amount,
          89: yunduijiang.c,
          90: xinxifabu.a,
          91: xinxifabu.amount,
          92: xinxifabu.b,
          93: bjyinyue.a,
          94: bjyinyue.amount,
          95: bjyinyue.b,
          96: jifangjk.a,
          97: jifangjk.amount,
          98: jifangjk.b,
          99: diantijk.a,
          100: diantijk.amount,
          101: diantijk.b,
          102: LED.a,
          103: LED.amount,
          104: shuibengjn.a,
          105: shuibengjn.amount,
          106: kongdiaojn.a,
          107: kongdiaojn.amount,
          108: shebeiqw.startDate + '至' + shebeiqw.endDate,
          109: shebeiqw.a,
          110: shebeiqw.amount,
          111: diantiqw.startDate + '至' + diantiqw.endDate,
          112: diantiqw.a,
          113: diantiqw.amount,
          114: diantijg.startDate + '至' + diantijg.endDate,
          115: diantijg.a,
          116: diantijg.amount,
          117: shebijy.a,
          118: shebijy.b,
          119: shebijy.amount
        }
        newList.push(obj)
      })
      this.exportData = newList
      this.downLoad()
    },
    downLoad() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = this.tHeader
        const filterVal = this.filterVal
        const data = this.formatJson(filterVal, this.exportData)
        export_json_to_excel(tHeader, data, '智慧社区数据库')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j]
        })
      )
    }
  }
}
</script>
