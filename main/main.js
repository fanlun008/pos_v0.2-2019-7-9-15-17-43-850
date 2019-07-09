'use strict';


/*
  given I have an array of barcode like
  [
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000001',
    'ITEM000001',
    'ITEM000004'
  ]
  and exist an databases about goods like
    {barcode: 'ITEM000000',name: '可口可乐',unit: '瓶',price: 3.00},
    {barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},
    {barcode: 'ITEM000002',name: '苹果',unit: '斤',price: 5.50},
    {barcode: 'ITEM000003',name: '荔枝',unit: '斤',price: 15.00},
    {barcode: 'ITEM000004',name: '电池',unit: '个',price: 2.00},
    {barcode: 'ITEM000005',name: '方便面',unit: '袋',price: 4.50}
  when I input the barCode List below :
    ['ITEM000000','ITEM000000','ITEM000000','ITEM000000','ITEM000000','ITEM000001','ITEM000001','ITEM000004']
  Then I should get the Receipt about detail info of goods such as:
    ***<没钱赚商店>收据***
    名称：可口可乐，数量：5瓶，单价：3.00(元)，小计：15.00(元)
    名称：雪碧，数量：2瓶，单价：3.00(元)，小计：6.00(元)
    名称：电池，数量：1个，单价：2.00(元)，小计：2.00(元)
    ----------------------
    总计：23.00(元)
    **********************
 */


function generateItems(barCodeList) {
  var item = {};
  barCodeList.forEach((value, index) => {
    if (item[value] == undefined) {
      item[value] = 1;
    } else {
      item[value]++;
    }
  })
  return item;
}

function findItemById(id) {
  var goodsDB = loadAllItems();

  var item;
  goodsDB.forEach((value, index) => {
    if (id == value['barcode']) {
      item = {'barcode': value['barcode'], 'name': value['name'], 'unit': value['unit'], 'price': value['price']};
    }
  })
  return item;
}

function getReceiptContentFromItems(items) {
  var totalMoney = 0;
  var receiptContent = '';
  receiptContent += (`***<没钱赚商店>收据***` + '\n');

  for(let id in items) {
    // console.log(id);
    var item = findItemById(id);
    if (item !== undefined) {
      receiptContent = receiptContent + '名称：' + item['name'] + '，数量：' + items[id] + item['unit'] + '，单价：' + item['price'].toFixed(2) + '(元)，小计：' + (items[id]*item['price']).toFixed(2) + '(元)' + '\n';
      totalMoney = totalMoney + item['price']*items[id];
    } else {
      receiptContent = '';
      receiptContent = '[ERROR]: not found item[id=' + id + '].Please enter correctly.'
      return receiptContent;
    }
  }

  receiptContent += ('----------------------\n' +
      '总计：' + totalMoney.toFixed(2) + '(元)\n' +
      '**********************');

  return receiptContent;
}


function printReceipt(inputs) {

  var items = generateItems(inputs);
  var resultReceiptContent = getReceiptContentFromItems(items);

  console.log(resultReceiptContent);
}
