import React, { useContext, useEffect, useState } from "react";
import {useLocation, useParams, Link, useNavigate} from "react-router-dom";
import { Context } from "../../index";
import PageTemplate from "../template/PageTemplate/PageTemplate";
import GiftCard from "../../pages/wishlist/GiftCard";
import Title from "antd/es/typography/Title";
import { Button, Modal } from "antd";

const SelectWishlist = () => {
    const { wishlistId } = useParams();
    const title = "Gifts";
    const { store } = useContext(Context);
    const [gifts, setGifts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [editable, setEditable] = useState(false);
    const [currentTitle, setCurrentTitle] = useState('');
    const [deleteModalVisible, setDeleteModalVisible] = useState(false); // Состояние модального окна удаления

    useEffect(() => {
        const fetchGifts = async () => {
            const gifts = await store.wishlists.getMyGifts(wishlistId);
            setGifts(gifts);
        };

        const fetchWishlist = async () => {
            const wishlist = await store.wishlists.getWishlist(wishlistId);
            setWishlist(wishlist);
            setCurrentTitle(wishlist.title || '');
        };
        fetchGifts();
        fetchWishlist();
    }, [store.wishlists, wishlistId]);

    const handleTitleClick = () => {
        setEditable(true);
    };

    const handleTitleChange = (e) => {
        setCurrentTitle(e.target.value);
    };

    const handleTitleBlur = async () => {
        setEditable(false);
        if (currentTitle.trim() !== wishlist.title) {
            await store.wishlists.update(wishlistId, { title: currentTitle, description: wishlist.description });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleTitleBlur();
        }
    };

    const handleDeleteButtonClick = () => {
        setDeleteModalVisible(true);
    };
    const navigate = useNavigate();

    const handleDeleteConfirm = async () => {
        await store.wishlists.delete(wishlistId);
        setDeleteModalVisible(false);
        navigate('/');
    };

    const handleDeleteCancel = () => {
        setDeleteModalVisible(false);
    };

    return (
        <PageTemplate title={title}>
            <div className={'flex flex-col gap-2'}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {editable ? (
                        <input
                            type="text"
                            value={currentTitle}
                            onChange={handleTitleChange}
                            onBlur={handleTitleBlur}
                            onKeyPress={handleKeyPress}
                            autoFocus
                        />
                    ) : (
                        <Title
                            level={2}
                            style={{ textAlign: 'center', fontSize: '24px', fontFamily: 'Anta', cursor: 'pointer' }}
                            onClick={handleTitleClick}
                        >
                            {currentTitle}
                        </Title>
                    )}
                    <Button danger onClick={handleDeleteButtonClick}>Delete</Button> {/* Кнопка удаления */}
                </div>
                {gifts?.map((gift) => (<GiftCard key={gift.id} gift={gift} />))}
            </div>
            <Modal // Модальное окно для подтверждения удаления
                title="Вы точно уверены, что хотите удалить вишлист и все подарки?"
                visible={deleteModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            >
                <p>После удаления вишлиста все подарки будут потеряны без возможности восстановления.</p>
            </Modal>
        </PageTemplate>
    );
};

export default SelectWishlist;