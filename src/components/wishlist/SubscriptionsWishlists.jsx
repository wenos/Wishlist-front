import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../../index";
import PageTemplate from "../template/PageTemplate/PageTemplate";
import GiftCard from "../../pages/wishlist/GiftCard";
import Title from "antd/es/typography/Title";
import {Button, Form, Input, Modal, Select} from "antd";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {CopyOutlined} from "@ant-design/icons";
import BookingCard from "../../pages/booking/BookingCard";
import WishlistCard from "./WIshlistCard";

const { Option } = Select;


const SubscriptionsWishlists = () => {
    const { store } = useContext(Context);
    const [wishlists, setWishlists] = useState([]);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });
    const book = async (id) => {
        // await store.sharedStore.book({uuid: sharedId, giftId: id});
        fetchWishlists();
    };

    const fetchWishlists = async () => {
        const wishlists = await store.sharedStore.getAll();
        setWishlists(wishlists)
    };
    useEffect(() => {
        fetchWishlists();
    }, [store.wishlists, setWishlists]);

    const handleCreateButtonClick = () => {
        setCreateModalVisible(true);
    };


    return (
        <PageTemplate title={"Wishlists"}>
            <div className={'scroll-auto'} style={{textAlign: "center"}}>
                <Button style={{fontFamily: "anta", fontSize: 18, width: "50%", margin: "0 auto", lineHeight: "10px"}} onClick={handleCreateButtonClick}>Create wishlist</Button>
                <div className={'flex flex-col gap-2'}>

                    {wishlists?.gifts?.map((gift) => (<BookingCard onBook={() => {
                        book(gift.id)
                    }} key={gift.id} gift={gift}/>))}
                </div>
            </div>
        </PageTemplate>
    );
};

export default SubscriptionsWishlists;
