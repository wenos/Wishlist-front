import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import WishlistCard from "../../components/wishlist/WIshlistCard";
import PageTemplate from "../../components/template/PageTemplate/PageTemplate";
import {Button, Form, Input, Modal} from "antd";

const MainPage = () => {
    const { store } = useContext(Context);
    const [wishlists, setWishlists] = useState([]);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    const fetchWishlists = async () => {
        const wishlists = await store.wishlists.getAll();
        setWishlists(wishlists)
    };
    useEffect(() => {
        fetchWishlists();
    }, [store.wishlists, setWishlists]);

    const handleCreateButtonClick = () => {
        setCreateModalVisible(true);
    };

    const handleCreateModalOk = async () => {
        await store.wishlists.create(formData);
        setCreateModalVisible(false);
        await fetchWishlists(); // Выполнить обновление списка вишлистов после успешного создания нового вишлиста
    };

    const handleCreateModalCancel = () => {
        setCreateModalVisible(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <PageTemplate title={"Wishlists"}>
            <div className={'scroll-auto'} style={{textAlign: "center"}}>
                <div style={{paddingBottom:"20px"}}>
                <Button style={{fontFamily: "anta", fontSize: 18, width: "50%", margin: "0 auto", lineHeight: "10px"}}
                        onClick={handleCreateButtonClick}>Create wishlist</Button>
                </div>
                <div className={'flex flex-col gap-2'}>
                    {wishlists?.map((wishlist) => (
                        <div key={wishlist.id}>
                            <WishlistCard wishlist={wishlist}/>
                        </div>
                    ))}
                </div>


            </div>

            <Modal
                title="Создать вишлист"
                visible={createModalVisible}
                onOk={handleCreateModalOk}
                onCancel={handleCreateModalCancel}
            >
                <Form layout="vertical">
                    <Form.Item label="Название" name="title">
                        <Input name="title" onChange={handleInputChange}/>
                    </Form.Item>
                    <Form.Item label="Описание" name="description">
                        <Input.TextArea name="description" onChange={handleInputChange}/>
                    </Form.Item>
                </Form>
            </Modal>
        </PageTemplate>
    );
};

export default MainPage;
