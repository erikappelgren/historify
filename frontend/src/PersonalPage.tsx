import React, { PureComponent, useEffect, useState } from 'react';
import GetTracks from './GetTracks';
import GetArtists from './GetArtists';

export enum TimeTerm{
    SHORT_TERM = 'short_term',
    MEDIUM_TERM = 'medium_term',
    LONG_TERM = 'long_term'
}

export enum TimePeriod{
    SHORT_TERM = 'This Month',
    MEDIUM_TERM = 'The Last 6 Months',
    LONG_TERM = 'Forever'
}

const PersonalPage = () => {
    const [rangeTerm, setRangeTerm] = useState<TimeTerm>(TimeTerm.SHORT_TERM);
    const [timePeriodRange, setTimePeriodRange] = useState<TimePeriod>(TimePeriod.SHORT_TERM);
    const [showTracks, setShowTracks] = useState<Boolean>(false);
    const [selectedButton, setSelectedButton] = useState<TimeTerm>(TimeTerm.SHORT_TERM);
    const [displayName, setDisplayName] = useState<string>();
    
    const OnClickHandler = (Term: TimeTerm, Period: TimePeriod) =>{
        setRangeTerm(Term); 
        setTimePeriodRange(Period); 
        setSelectedButton(Term);
    }

    useEffect(() => {
        fetch('http://localhost:5005/user', {
            credentials: 'include'
        })
            .then(res => res.text())
            .then(data => {setDisplayName(data)})
    },[])

    return (
        <div className="GeneralSpotifyHistoryBox">
            <h3>{displayName}'s Spotify History</h3>
            <div className="GeneralSpotifyContentCapsule">
                <button className="ChangeDataButton" 
                    onClick={() => {setShowTracks(false)}}>
                    SHOW ARTISTS
                </button>
                <button id='knapp2' className="ChangeDataButton"
                    onClick={() => {setShowTracks(true)}}>
                    SHOW TRACKS
                </button>
            </div>
            <div className="TimeTermButtons">
                
                <button className={selectedButton === TimeTerm.SHORT_TERM
                    ? "GraphListButtonSelected" : "GraphListButton"} 
                    onClick={() => OnClickHandler(TimeTerm.SHORT_TERM, TimePeriod.SHORT_TERM)}>
                    Last Month
                </button>
                
                <button className={selectedButton === TimeTerm.MEDIUM_TERM 
                    ? "GraphListButtonSelected" : "GraphListButton"} 
                    onClick={() => OnClickHandler(TimeTerm.MEDIUM_TERM, TimePeriod.MEDIUM_TERM)}>
                    Last 6 Months
                </button>
                
                <button className={selectedButton === TimeTerm.LONG_TERM 
                    ? "GraphListButtonSelected" : "GraphListButton"} 
                    onClick={() => OnClickHandler(TimeTerm.LONG_TERM, TimePeriod.LONG_TERM)}>
                    Last Few Years
                </button>
                
            </div>
            { showTracks ? <GetTracks rangeTerm={rangeTerm} timePeriodRange={timePeriodRange}/> 
                : <GetArtists rangeTerm={rangeTerm} timePeriodRange={timePeriodRange}/>}
        </div>
    );
}

export default PersonalPage;