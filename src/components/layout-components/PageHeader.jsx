import React from 'react'
import {PageHeader} from 'antd';

function PageHeaderComponent() {
    return (
        <div className="page-header-container">
            <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="Title"
                subTitle="This is a subtitle"
            />,
        </div>
    );
}

export default PageHeaderComponent;
