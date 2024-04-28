import React, {useContext, useEffect} from 'react';
import PageTemplate from "../../components/template/PageTemplate/PageTemplate";
import {Context} from "../../index";
import CourseCard from "../../components/topic/courses/CourseCard";
import {PlusCircleFilled} from "@ant-design/icons";

const Home = () => {
    const {store} = useContext(Context);
    const [courses, setCourses] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setCourses(await store.courses.getAll());
        };
        fetchData();
    }, [setCourses, store]);

    // Ручка для обновления списка курсов
    const updateCourses = async () => {
        setCourses(await store.courses.getAll())
    }

    return (
        <PageTemplate title={"Выбор курса"}>
            <div className={'cardList'}>
                {
                    courses?.sort((a, b) => a.number - b.number)
                        ?.map(course => (
                            <CourseCard key={course.id} course={course} updateCourses={updateCourses}/>
                        ))
                }
                {
                    store.isAdmin() &&
                    <CourseCard key={0} course={{
                        id: 0,
                        title: 'Добавить курс',
                        description: "Нажмите для добавления",
                        number: <PlusCircleFilled/>
                    }} updateCourses={updateCourses}/>
                }
            </div>
        </PageTemplate>
    );
};

export default Home;