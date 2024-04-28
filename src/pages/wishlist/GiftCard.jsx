import React from 'react';
import {Card} from "antd";

const GiftCard = ({gift}) => {
    const colors = ['magenta', 'red', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];

    const colorIndex = gift?.id * 31 % colors.length;
    const color = colors[colorIndex];

    return (
        <div className="wishlist-card-container"
             style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0'}}>
            <Card title={gift?.title} bordered={true}
                  style={{width: '60vw', border: `2px solid ${color}`, fontSize: '20px'}}>
                <p>Details: {gift.details}</p>
                {gift.link && <p>Link: {gift.link}</p>}
            </Card>
        </div>
    );
};

export default GiftCard;
