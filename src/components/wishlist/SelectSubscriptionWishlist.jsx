import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../../index";
import PageTemplate from "../template/PageTemplate/PageTemplate";
import Title from "antd/es/typography/Title";
import {Button, Input, Modal, Select} from "antd";
import SubscriptionGiftCard from "../save/SubscriptionGiftCard";

const {Option} = Select;


const SelectSubscriptionWishlist = () => {
    const {wishlistId} = useParams();
    const {store} = useContext(Context);
    const [gifts, setGifts] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    const [currentTitle, setCurrentTitle] = useState('');
    const [currentDescription, setDescription] = useState(' ');


    const [giftName, setGiftName] = useState('');
    const [giftDetails, setGiftDetails] = useState('');
    const [giftLink, setGiftLink] = useState('');
    const title = "Gifts";


    const fetchGifts = async () => {
        const gifts = await store.wishlists.getMyGifts(wishlistId);
        setGifts(gifts);
    };

    const fetchWishlist = async () => {
        const wishlist = await store.wishlists.getWishlist(wishlistId);
        setWishlist(wishlist);
        setCurrentTitle(wishlist.title || '');
        setDescription(wishlist.description || ' ');
    };
    const handleCreateGift = async () => {
        // Выполнить запрос на создание подарка
        await store.wishlists.createGift({
            title: giftName,
            details: giftDetails,
            link: giftLink,
            listId: wishlist.id
        });
        await fetchGifts();
        await fetchWishlist();
        // Очистить форму после создания подарка
        setGiftName('');
        setGiftDetails('');
        setGiftLink('');
    };
    useEffect(() => {
        fetchGifts();
        fetchWishlist();
    }, [store.wishlists, wishlistId]);



    return (
        <PageTemplate title={title}>
            <div className={'flex flex-col gap-2'}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Title
                        level={2}
                        style={{textAlign: 'center', fontSize: '24px', fontFamily: 'Anta'}}
                    >
                        Title: {currentTitle}
                    </Title>
                </div>


                <div style={{width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                    <Title
                        level={2}
                        style={{textAlign: 'center', fontSize: '24px', fontFamily: 'Anta'}}
                    >
                        Description: {currentDescription}
                    </Title>
                </div>


                <div>

                </div>
                {gifts?.map((gift) => (
                    <SubscriptionGiftCard  key={gift.id} gift={gift}/>))}
            </div>
        </PageTemplate>
    );
};

export default SelectSubscriptionWishlist;
