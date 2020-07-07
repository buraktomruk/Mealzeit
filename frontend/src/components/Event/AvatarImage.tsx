import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    position: relative;
`;

const StyledImage = styled.img`
    display: block;
    width: 100%;
    height: auto;
`;

const Text = styled.div`
    color: white;
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
`;

const Overlay = styled.img`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: .5s ease;
    background-color: #008CBA;
`;

interface Props {
    imageSource: string;
    altText: string;
}

export const Logo = (props: Props) => (
    <StyledDiv>
        <StyledImage src={props.imageSource} alt={props.altText} />
        <Overlay>
            <Text>Click to add</Text>
        </Overlay>
    </StyledDiv>
);
