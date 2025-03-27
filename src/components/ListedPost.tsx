import React from 'react';

const ListedPostContainerCSS: React.CSSProperties = {
    display: 'flex',
    padding: '1.5em',
    background: '#1d1d1d',
    borderRadius: '1em',
    fontWeight: 500,
};

const ListedPostTextCSS: React.CSSProperties = {
    color: '#aaa',
    fontSize: '1em',
    fontWeight: 300,
    textAlign: 'start',
    margin: 0,
    display: '-webkit-box',
    WebkitLineClamp: 3,      // limits the text to 3 lines
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
};

// Dummy ListedPost component for demonstration purposes
const ListedPost: React.FC = () => {
    return (
        <div style={ListedPostContainerCSS}>

            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#aaa', marginTop: '0.4em', marginRight: '1em' }}></div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1em' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa' }}>
                    <div style={{display: 'flex', gap: '1em', alignItems: 'center' }}>
                        <span style={{ textAlign: 'start' }}>TOWN | UNI<br />DESTINATION</span>
                        <span style={{ color: 'green', fontSize: '1.1em' }}>• 100 Requests</span>
                    </div>
                    <span style={{ textAlign: 'end' }}>7:56 PM<br />2/1/25</span>
                </div>

                <p style={ListedPostTextCSS}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
            </div>

        </div>
    );
};

export default ListedPost;