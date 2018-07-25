import React from 'react';
import {List,Button,Card } from 'antd';
const { Meta } = Card;

const products = (props)=>{


    return(
        <List
            grid={{ gutter: 16, xs: 1, sm:2, md: 3, xl: 5 }}
            dataSource={props.products}
            renderItem={item => (
            <List.Item>
                <Card
                    hoverable
                    cover={<img alt={item.name} src={item.image} style={{margin:'auto auto', width:'180px',height:'200px'}} />}>
                    <Meta
                    title={item.name}
                    description={'Price: '+ item.price}/>
                    <Button onClick={()=>props.clicked(item)} style={{marginTop:'5px'}} type="primary" icon="shopping-cart" >Add to Cart</Button>
                </Card>
            </List.Item>
            )}
        />

        // <Row gutter={16}>
        //     {products}
        // </Row>  
    )
}
export default products;