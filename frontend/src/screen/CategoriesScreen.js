import axios from 'axios';
import React, { useState, useEffect } from 'react';

const CategoriesScreen = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fecthData = async () => {
            const { data } = await axios.get('http://localhost:3001/api/categories');
            setCategories(data.categories);
        }
        fecthData();
        return () => {

        };
    },[]);
    const closeMenu = () => {
        document.querySelector('.sidebar').classList.remove('open');
    }
    return (
        <aside className="sidebar">
            <h3 className="title-sidebar">Danh mục</h3>
            {/* <hr className="hr-sidebar" /> */}
            <button className="sidebar-close-button" onClick={closeMenu}>x</button>
            <ul>
                {
                    categories.map(category => (
                        <li>
                            <a href="index.html">{category.name}</a>
                        </li>
                    ))
                }

            </ul>
        </aside>
    );
}

export default CategoriesScreen;
