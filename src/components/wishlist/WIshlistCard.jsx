import React from 'react';
import {Card} from "antd";
import {Link} from "react-router-dom";

const WishlistCard = ({wishlist}) => {
    const colors = ['magenta', 'red', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];


    const colorIndex = wishlist?.id * 31 % colors.length;
    const color = colors[colorIndex];

    return (
        <div className="wishlist-card-container"
             style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0'}}>
            <Link to={{
                pathname: `/wishlists/${wishlist?.id}`,
                state: {title: "это я вставил в wislistCard"}
            }}>
                <Card title={wishlist?.title} bordered={true}
                      style={{width: '80vw', border: `1px solid ${color}`}}>
                </Card>
            </Link>
        </div>
    );
};

export default WishlistCard;
