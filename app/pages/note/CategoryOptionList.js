/**
 * Created by lyan2 on 16/11/14.
 */
import React, { Component } from 'react';
import {
    ListView,
    StyleSheet
} from 'react-native';
import OptionList from '../../components/optionlist';

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

        this.state.optionsProps = {
            onSelect: props.onSelect,
            onCancel: props.onCancel,
            onEditing: props.onEditing || this._defaultOnEditing,
            renderRow: props.renderRow
        };
    }

    componentWillMount() {

    }

    _defaultOnEditing (text) {
        // fetch('https://mywebsite.com/endpoint/', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         firstParam: 'yourValue',
        //         secondParam: 'yourOtherValue',
        //     })
        // }).then((response) => response.json())
        //     .then((responseJson) => {
        //         return responseJson.movies;
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });

        let source = {options:
        {"option1":{
            title: '电子产品'
        },"option2":{
            title: '服饰'
        },"option3":{
            title: '办公用品'
        },"option4":{
            title: '家具'
        },"option5":{
            title: '鞋帽'
        }}};

        this.setState({dataSource:this.state.dataSource.cloneWithRowsAndSections(source)});
    }

    render() {
        return (
            <OptionList dataSource={this.state.dataSource} {...this.state.optionsProps} />
        );
    }
}

