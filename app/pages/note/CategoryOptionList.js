/**
 * Created by lyan2 on 16/11/14.
 */
import React, { Component } from 'react';
import {
    ListView,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import OptionList from '../../components/optionlist';
import configs from '../../constants/configs';
import StoreActions from '../../constants/actions';

export default class CategoryOptionList extends Component {
    constructor(props) {
        super(props);

        /* we used the defaultGetRowData, this requires dataBlob has below structure:
         * dataBlob = {section:{rowID_1: rowData1, rowID_2: rowData2,...},...};
         *
         * Todo
         * We need to make sure rowID is noteID
         */
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 != s2
        });

        this.state = {
            dataSource: ds
        };
    }

    componentWillReceirveProps() {
        const { dispatch } = this.props;
        dispatch({type:StoreActions.FETCH_CATEGORIES});
    }
    
    _defaultOnTextInput (event) {
        let source = {options:{}};

        if (this.props.categories && this.props.categories.length > 0) {
            var reg = new RegExp("\w*" + event.nativeEvent.text + "\w*");
            console.log(reg.toString());

            let validCategories = this.props.categories.filter(function(category){
                reg.test(category.name);
            });

            validCategories.forEach(function(category){
                console.log(category);
                source.options[category.id] = {title: category.name};
            });

            this.setState({dataSource:this.state.dataSource.cloneWithRowsAndSections(source)});
        } else {
            fetch(configs.serviceUrl + 'common/commodity/categories/',  {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.resultValues && responseJson.resultValues.length > 0) {
                    this.props.categories = responseJson.resultValues;
                    responseJson.resultValues.forEach(function(category){
                        source.options[category.id] = {title: category.name};
                    });
                }
                this.setState({dataSource:this.state.dataSource.cloneWithRowsAndSections(source)});
            })
            .catch((error) => {
                console.error(error);
            });
        }

        //let source = {options:
        //{"option1":{
        //    title: '电子产品'
        //},"option2":{
        //    title: '服饰'
        //},"option3":{
        //    title: '办公用品'
        //},"option4":{
        //    title: '家具'
        //},"option5":{
        //    title: '鞋帽'
        //},"option6":{
        //    title: '电子产品'
        //},"option7":{
        //    title: '服饰'
        //},"option8":{
        //    title: '办公用品'
        //},"option9":{
        //    title: '家具'
        //},"option10":{
        //    title: '鞋帽'
        //},"option11":{
        //    title: '电子产品'
        //},"option12":{
        //    title: '服饰'
        //},"option13":{
        //    title: '办公用品'
        //},"option14":{
        //    title: '家具'
        //},"option15":{
        //    title: '鞋帽'
        //},"option16":{
        //    title: '电子产品'
        //},"option17":{
        //    title: '服饰'
        //},"option18":{
        //    title: '办公用品'
        //},"option19":{
        //    title: '家具'
        //},"option20":{
        //    title: '鞋帽'
        //}}};

    }

    render() {
        return (
            <OptionList style={{flex:1}} dataSource={this.state.dataSource} onTextInput={this._defaultOnTextInput.bind(this)} {...this.props} />
        );
    }
}

// get selected photos from store.state object.
function mapStateToProps(state) {
    const { categories } = state;
    return {
        categories
    };
}

export default connect(mapStateToProps)(CategoryOptionList);