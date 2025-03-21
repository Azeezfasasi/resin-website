import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

function LoadingSpinner() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginLeft: "auto", marginRight: "auto" }}>
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#F57F17"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass="three-container"
                visible={true}
            />
        </div>
    );
}

export default LoadingSpinner;