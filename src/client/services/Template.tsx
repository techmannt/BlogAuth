import * as React from 'react';
import { useState, useEffect } from 'react';

const Template: React.FC<TemplateProps> = props => {
    return (
        <div>
            <h1 className="text-center">Template Component</h1>
        </div>
    );
}

interface TemplateProps {}

export default Template;