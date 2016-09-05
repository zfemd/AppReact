/**
 * Created by lyan2 on 16/8/13.
 */
import React, { Component } from 'react';
import {
    ListView,
    StyleSheet
} from 'react-native';
import OptionList from '../../components/optionlist';

export default class BrandOptionList extends Component {
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

    componentWillMount() {
        let source = {options:
        {"option1":{
            title: '苹果'
        },"option2":{
            title: 'Dell'
        },"option3":{
            title: '美特斯邦威'
        },"option4":{
            title: '李宁'
        },"option5":{
            title: '特步'
        }}}

        this.setState({dataSource:this.state.dataSource.cloneWithRowsAndSections(source)});
    }

    render() {
        return (
            <OptionList dataSource={this.state.dataSource} {...this.props} />
        );
    }
}

