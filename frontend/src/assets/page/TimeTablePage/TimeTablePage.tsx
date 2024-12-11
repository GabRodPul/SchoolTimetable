import NavigationTab from '#src/assets/componets/CommonComps/navigationTab/NavigationTab';
import RigthMenu from '#src/assets/componets/CommonComps/rigthMenu/rigthMenu';
import Schedule from '#src/assets/componets/TimeTableComps/schedule/schedule';
import { useState, useEffect } from 'react';
import { FetchState, FetchData } from '#src/types/api';
import { ScheduleResponse } from '#common/@types/models';


function TimeTablePage() {
    const [scheduleData, setScheduleData] = useState<FetchData<ScheduleResponse[]>>({
        state: FetchState.NotStarted,
    });

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                setScheduleData({ state: FetchState.Loading });
        
                const response = await fetch('/api/schedule');
                if (!response.ok) {
                    throw new Error('Failed to fetch schedule');
                }
        
                const data: ScheduleResponse[] = await response.json(); 
                setScheduleData({ state: FetchState.Success, data });
            } catch (error) {
                if (error instanceof Error) {
                    setScheduleData({ state: FetchState.Error, error });
                } else {
                    setScheduleData({ state: FetchState.Error, error: new Error("Unknown error occurred") });
                }
            }
        };
        

        fetchSchedule();
    }, []);

    return (
        <div>
            <NavigationTab />
            <RigthMenu />
            <Schedule scheduleData={scheduleData} />
        </div>
    );
}

export default TimeTablePage;
