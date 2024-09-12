import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faFlag, faSearch, faPooStorm, faPodcast } from '@fortawesome/free-solid-svg-icons';
import '../../style/creator.css';
import AppFooter from '../../components/Header_Footer/AppFooter';
import AppHeader from '../../components/Header_Footer/AppHeader';

export default function Creator() {
    return (
        <><AppHeader /><div className="creator-container">
            <div className="creator-card">
                <FontAwesomeIcon icon={faPodcast} size="2x" />
                <h2>Recent Post</h2>
                <p>Content related to new creators can go here.</p>
            </div>
            <div className="creator-card">
                <FontAwesomeIcon icon={faFlag} size="2x" />
                <h2>Post Report</h2>
                <p>Content related to post reports can go here.</p>
            </div>
            <div className="creator-card">
                <FontAwesomeIcon icon={faSearch} size="2x" />
                <h2></h2>
                <p>Content related to search functionality in React JSX can go here.</p>
            </div>
        </div>
        <AppFooter/>
        </>
    );
  }