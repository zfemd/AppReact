
import types from '../constants/actions';
import _ from 'lodash';

let test = [{"itemId":"543735585887","itemTitle":"超薄 移动联通电信全网通4G八核智能手机5.5寸大屏指纹解锁一体机","itemUrl":"http://item.taobao.com/item.htm?id=543735585887","itemPicUrl":"http://img4.tbcdn.cn/tfscom/i1/2606182403/TB2kDBrihtmpuFjSZFqXXbHFpXa_!!2606182403.jpg","commissionRate":null,"commission":7.5,"itemPrice":750.0,"keyword":"小米","order":1},{"itemId":"542024468661","itemTitle":"米来乐 C6E 直板学生儿童手机男女生移动老人机迷你小手机","itemUrl":"http://item.taobao.com/item.htm?id=542024468661","itemPicUrl":"http://img4.tbcdn.cn/tfscom/i4/883155198/TB2Vd6rd8yN.eBjSZFIXXXbUVXa_!!883155198.jpg","commissionRate":null,"commission":2.2,"itemPrice":220.0,"keyword":"小米","order":2},{"itemId":"542277170615","itemTitle":"PHICOMM/斐讯 C1530L移动联通电信全网通4G超薄智能手机指纹识别","itemUrl":"http://item.taobao.com/item.htm?id=542277170615","itemPicUrl":"http://img2.tbcdn.cn/tfscom/i4/TB1J8KAOVXXXXacXVXXXXXXXXXX_!!0-item_pic.jpg","commissionRate":null,"commission":3.99,"itemPrice":399.0,"keyword":"小米","order":3},{"itemId":"532987853156","itemTitle":"Noain/诺亚信 A1智能老人手机正品老年手机移动4G手机直板老人机","itemUrl":"http://item.taobao.com/item.htm?id=532987853156","itemPicUrl":"http://img3.tbcdn.cn/tfscom/i4/120426806/TB2qpLUjdFopuFjSZFHXXbSlXXa_!!120426806.jpg","commissionRate":null,"commission":3.99,"itemPrice":399.0,"keyword":"小米","order":4},{"itemId":"543548820492","itemTitle":"黑旗 R9 MAX 6.44寸大屏后置双摄像头移动全网通4G十核智能手机","itemUrl":"http://item.taobao.com/item.htm?id=543548820492","itemPicUrl":"http://img4.tbcdn.cn/tfscom/i1/436310237/TB29awTbhBmpuFjSZFsXXcXpFXa_!!436310237.jpg","commissionRate":null,"commission":19.99,"itemPrice":1999.0,"keyword":"小米","order":5},{"itemId":"523774021627","itemTitle":"纽曼M560 电信老人手机直板 移动老年机超长待机大字大声老人机","itemUrl":"http://item.taobao.com/item.htm?id=523774021627","itemPicUrl":"http://img1.tbcdn.cn/tfscom/i3/1743687320/TB2hvk3hr4npuFjSZFmXXXl4FXa_!!1743687320.jpg","commissionRate":null,"commission":4.92,"itemPrice":492.0,"keyword":"小米","order":6},{"itemId":"535420392852","itemTitle":"直降100元!一年会员Letv/乐视 乐2手机高配全网通4G智能手机max2","itemUrl":"http://item.taobao.com/item.htm?id=535420392852","itemPicUrl":"http://img1.tbcdn.cn/tfscom/i2/TB1d8ERPFXXXXc0XXXXXXXXXXXX_!!0-item_pic.jpg","commissionRate":null,"commission":10.99,"itemPrice":1099.0,"keyword":"小米","order":7},{"itemId":"532895798726","itemTitle":"21KE m2s 21克老人手机智能老人机移动4G大屏大字大声触屏老年机","itemUrl":"http://item.taobao.com/item.htm?id=532895798726","itemPicUrl":"http://img3.tbcdn.cn/tfscom/i1/TB1TVyvMVXXXXXKXXXXXXXXXXXX_!!0-item_pic.jpg","commissionRate":null,"commission":8.38,"itemPrice":838.0,"keyword":"小米","order":8},{"itemId":"543334455828","itemTitle":"正品奇小米 qixiaomi4移动电信4G智能5.0寸全网通手机","itemUrl":"http://item.taobao.com/item.htm?id=543334455828","itemPicUrl":"http://img4.tbcdn.cn/tfscom/i4/717886846/TB2iKu7aUdnpuFjSZPhXXbChpXa_!!717886846.jpg","commissionRate":null,"commission":7.11,"itemPrice":711.0,"keyword":"小米","order":9},{"itemId":"542872972896","itemTitle":"VOTO Xplay 5 移动4G学生安卓智能超薄5.0寸大屏指纹一体手机老人","itemUrl":"http://item.taobao.com/item.htm?id=542872972896","itemPicUrl":"http://img3.tbcdn.cn/tfscom/i4/762788877/TB2F8t6c4hmpuFjSZFyXXcLdFXa_!!762788877.jpg","commissionRate":null,"commission":7.98,"itemPrice":798.0,"keyword":"小米","order":10}];
const initialState = {
    itemList: test
};

const search = function (state = initialState, action = {}) {
    switch (action.type) {
        case types.RECEIVE_ITEM_SEARCH_LIST:
            return Object.assign({}, state, {
                itemList: action.list
            });
        default:
            return state;
    }
};

export default search;
