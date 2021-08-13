import React, { Component } from 'react';

class Filter extends Component {
    render() {
        return (
            <div className="filter-1">
                <div className="filter-result">
                    Products New 12
                </div>
                <div className="filter-sort">
                    Order {" "}
                    <select className='select-filter'>
                        <option>Latest</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>
                    </select>
                </div>
            </div>
        );
    }
}
export default Filter;
