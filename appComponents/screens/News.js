import React from 'react';
import {
    View,
    Text
} from 'react-native';
import Layout from '../../utils/Layout';


const News = () => {
    return (
        <Layout>
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
