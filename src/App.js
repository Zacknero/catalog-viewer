import React, {Fragment, useState} from 'react'
import 'h8k-components'

import {image1, image2, image3, image4} from './assets/images'
import {Thumbs, Viewer} from './components'

const title = 'Catalog Viewer'

function App() {
    const catalogsList = [
        {
            thumb: image1,
            image: image1
        },
        {
            thumb: image2,
            image: image2
        },
        {
            thumb: image3,
            image: image3
        },
        {
            thumb: image4,
            image: image4
        }
    ]

    const [catalogs] = useState([...catalogsList])
    const [activeIndex, setActiveIndex] = useState(0)
    const [slideTimer, setSlideTimer] = useState(null | 0)
    const [slideDuration] = useState(3000)

    const handleClick = () => {
        if (slideTimer) {
            clearInterval(slideTimer);
            setSlideTimer(0);
            return;
        }

        const newIntervalId = setInterval(() => {
            setActiveIndex(activeIndex => activeIndex < catalogs.length - 1 ? activeIndex + 1 : 0);
        }, slideDuration);
        setSlideTimer(newIntervalId);
    };

    const arrowClicked = (typeArrow) => () => {
        if (typeArrow === 'forward') {
            const index = isEntireArray(activeIndex, true) ? activeIndex + 1 : 0;
            changeThumbsImage(index)
        } else {
            const index = isEntireArray(activeIndex) ? activeIndex - 1 : catalogs.length - 1;
            changeThumbsImage(index)
        }
    }

    const isEntireArray = (num, toIncrease = false) => {
        if (toIncrease) {
            return num < catalogs.length - 1
        } else {
            return num > 0
        }
    }

    const changeThumbsImage = (index) => {
        setActiveIndex(index)
    }

    return (
        <Fragment>
            <h8k-navbar header={title}/>
            <div className='layout-column justify-content-center mt-75'>
                <div className='layout-row justify-content-center'>
                    <div className='card pt-25'>
                        <Viewer catalogImage={catalogs[activeIndex].image}/>
                        <div className='layout-row justify-content-center align-items-center mt-20'>
                            <button
                                className="icon-only outlined"
                                data-testid="prev-slide-btn"
                                onClick={arrowClicked('back')}
                            >
                                <i className="material-icons">arrow_back</i>
                            </button>
                            <Thumbs
                                items={catalogs}
                                currentIndex={activeIndex}
                                onThumbsClicked={changeThumbsImage}
                            />
                            <button
                                className="icon-only outlined"
                                data-testid="next-slide-btn"
                                onClick={arrowClicked('forward')}
                            >
                                <i className="material-icons">arrow_forward</i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='layout-row justify-content-center mt-25'>
                    <input
                        type='checkbox'
                        data-testid='toggle-slide-show-button'
                        onClick={handleClick}
                    />
                    <label className='ml-6'>Start Slide Show</label>
                </div>
            </div>
        </Fragment>
    )
}

export default App

