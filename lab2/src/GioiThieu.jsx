import React from 'react';
import "./w3c.css";
export default class GioiThieu extends React.Component {
    render() {
        return (
           <div>
                <div id="gioithieu">
                    <h1>Đây là trang giới thiệu!</h1>
                </div>
                <div>
                <div className="w3-row w3-padding-64" id="about">
                    <div className="w3-col m6 w3-padding-large w3-hide-small">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXwIAPkVJgQ8_TFDazp0hlsIF9qvcSnFpclA&s" className="w3-round w3-image w3-opacity-min" alt="Table Setting" width={600} height={750} />
                    </div>
                    <div className="w3-col m6 w3-padding-large">
                    <h1 className="w3-center">About Catering</h1><br />
                    <h5 className="w3-center">Tradition since 1889</h5>
                    <p className="w3-large">The Catering was founded in blabla by Mr. Smith in lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute iruredolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.We only use <span className="w3-tag w3-light-grey">seasonal</span> ingredients.</p>
                    <p className="w3-large w3-text-grey w3-hide-medium">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
                <hr />
                </div>
           </div>
        )
    }
}

