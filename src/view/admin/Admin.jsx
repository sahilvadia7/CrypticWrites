import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faFlag, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../../style/admin.css';
import AppFooter from '../../components/Header_Footer/AppFooter';
import AppHeader from '../../components/Header_Footer/AppHeader';

export default function Admin() {
    return (
        <><AppHeader /><div className="admin-container">
            <div className="admin-card">
                <FontAwesomeIcon icon={faUserPlus} size="2x" />
                <h2>New Creator</h2>
                <p>Content related to new creators can go here.</p>
            </div>
            <div className="admin-card">
                <FontAwesomeIcon icon={faFlag} size="2x" />
                <h2>Post Report</h2>
                <p>Content related to post reports can go here.</p>
            </div>
            <div className="admin-card">
                <FontAwesomeIcon icon={faSearch} size="2x" />
                <h2>Search in React JSX</h2>
                <p>Content related to search functionality in React JSX can go here.</p>
            </div>
        </div>
        <AppFooter/>
        </>
    );
}