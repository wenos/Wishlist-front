import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Context} from "../../index";
import PageTemplate from "../../components/template/PageTemplate/PageTemplate";
import GiftCard from "../wishlist/GiftCard";
import Title from "antd/es/typography/Title";
import {Button, Card, Form, Input, Modal, Select} from "antd";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {CopyOutlined, DeleteOutlined, EditOutlined, LinkOutlined} from "@ant-design/icons";
import BookingCard from "../../components/booking/BookingCard";
import WishlistCard from "../../components/wishlist/WIshlistCard";

const {Option} = Select;


const SubscriptionsWishlists = () => {
    const {store} = useContext(Context);
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

    const handleOpenLink = (link) => {
        if (link) {
            window.open(link, '_blank');
        }
    };

    return (
        <PageTemplate title={"Saves"}>
            <div className={'scroll-auto'} style={{textAlign: "center"}}>
                <div className={'flex flex-col gap-2'}>

                    {wishlists?.map((wishlist) => (
                        <div style={{
                            marginBottom: '20px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            padding: '10px',
                            borderColor: '#5087E1',
                            width: '80%',
                            wordWrap: 'break-word',
                            margin: '0 auto'
                        }}>
                                <Link to={{
                                    pathname: `/subscriptions/${wishlist?.id}`
                                }}>
                                    <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-around'}}>
                                        <div>Wishlist by {wishlist?.ownerName}</div>

                                        <div>Title: {wishlist?.title}</div>
                                    </div>
                                </Link>
                        </div>

                    ))}
                </div>
            </div>
        </PageTemplate>
    );
};

export default SubscriptionsWishlists;
