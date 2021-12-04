import React from 'react';
import {
    View,
    Text
} from 'react-native';
import Layout from '../../utils/Layout';


const News = () => {
    return (
        <Layout  comp={()=>{return(<Text>hello</Text>)}}>
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',

            }}
        >
            <Text> News </Text>
        </View>
        </Layout>
    )
}

export default News;
