/**
 * Created by lyan2 on 16/8/13.
 */
import React, { Component } from 'react';
import {
    ListView,
    StyleSheet
} from 'react-native';
import OptionList from '../../components/optionlist';

export default class NationOptionList extends Component {
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
            dataSource: ds,
            nation: null,
            city: null
        };
    }

    _defaultOnTextInput (text) {
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
            title: '中国'
        },"option2":{
            title: '美国'
        },"option3":{
            title: '日本'
        },"option4":{
            title: '加拿大'
        }, 'option5': {
            title: '韩国'
        }, 'option6': {
            title: '澳大利亚'
        }, 'option7': {
            title: '英国'
        }, 'option8': {
            title: '法国'
        }}};

        this.setState({dataSource:this.state.dataSource.cloneWithRowsAndSections(source)});
    }

    _defaultOnSelect(rowData) {
        if (this.state.nation == null) {
            this.state.nation = rowData.title;

            let source = {options:
            {"beijing":{
                title: '北京'
            },"shanghai":{
                title: '上海'
            },"tianjing":{
                title: '天津'
            },"hangzhou":{
                title: '杭州'
            }, 'changsha': {
                title: '长沙'
            }, 'nanjing': {
                title: '南京'
            }, 'suzhou': {
                title: '苏州'
            }, 'hefei': {
                title: '合肥'
            }}};

            this.setState({dataSource:this.state.dataSource.cloneWithRowsAndSections(source)});
        } else {
            if (this.props.onSelect) {
                this.state.city = rowData.title;

                let data = {
                    nation: this.state.nation,
                    city: this.state.city
                };
                this.props.onSelect(data);
            }
        }
    }

    render() {
        return (
            <OptionList dataSource={this.state.dataSource} onTextInput={this._defaultOnTextInput.bind(this)}
                        {...this.props} onSelect={this._defaultOnSelect.bind(this)} />
        );
    }
}

