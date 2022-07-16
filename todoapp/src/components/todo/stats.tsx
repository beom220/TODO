import {useRecoilValue} from "recoil";
import {todoListStatsState} from "../../recoil/newTodo";
import {ResponsivePie} from "@nivo/pie"

export default function Stats() {
    const {totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted} = useRecoilValue(todoListStatsState);
    const stats = useRecoilValue(todoListStatsState);
    console.log(stats);
    const formattedPercentCompleted = Math.round(percentCompleted * 100);

    return (
        <div style={{textAlign:"center"}}>
            {totalNum ? <PieChart stats={stats}/> : null}
            <ul style={{listStyle:"none", display:"inline-block", verticalAlign:"middle"}}>
                <li>전체 : {totalNum}</li>
                <li>완료 : {totalCompletedNum}</li>
                <li>미완료 : {totalUncompletedNum}</li>
                <li>완료율 : {formattedPercentCompleted}%</li>
            </ul>
        </div>
    )
}

function PieChart({stats}: any){
    const handle = {
        padClick: (data: any) => {
            console.log(data);
        },

        legendClick: (data: any) => {
            console.log(data);
        },
    };

    return (
        // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
        <div style={{width:"360px", height:"300px", display:"inline-block"}}>
            <ResponsivePie
                /**
                 * chart에 사용될 데이터
                 */
                data={[
                    {id: '미완료', value: stats.totalUncompletedNum},
                    {id: '완료', value: stats.totalCompletedNum},
                    // { id: 'fanta', value: 221 },
                ]}
                /**
                 * chart margin
                 */
                margin={{top: 40, right: 80, bottom: 80, left: 80}}
                /**
                 * chart 중간 빈공간 반지름
                 */
                innerRadius={0.5}
                /**
                 * pad 간격
                 */
                padAngle={1.8}
                /**
                 * pad radius 설정 (pad별 간격이 있을 시 보임)
                 */
                cornerRadius={8}
                /**
                 * chart 색상
                 */
                colors={['red', 'blue']} // 커스터하여 사용할 때
                // colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
                /**
                 * pad border 두께 설정
                 */
                borderWidth={2}
                /**
                 * link label skip할 기준 각도
                 */
                arcLinkLabelsSkipAngle={0}
                /**
                 * link label 색상
                 */
                arcLinkLabelsTextColor="#000000"
                /**
                 * link label 연결되는 선 두께
                 */
                arcLinkLabelsThickness={2}
                /**
                 * link label 연결되는 선 색상
                 */
                arcLinkLabelsColor={{from: 'color'}} // pad 색상에 따라감
                /**
                 * label (pad에 표현되는 글씨) skip할 기준 각도
                 */
                arcLabelsSkipAngle={10}
                theme={{
                    /**
                     * label style (pad에 표현되는 글씨)
                     */
                    labels: {
                        text: {
                            fontSize: 14,
                            fill: '#fff',
                        },
                    },
                    /**
                     * legend style (default로 하단에 있는 색상별 key 표시)
                     */
                    legends: {
                        text: {
                            fontSize: 12,
                            fill: '#000000',
                        },
                    },
                }}
                /**
                 * pad 클릭 이벤트
                 */
                onClick={handle.padClick}
                /**
                 * legend 설정 (default로 하단에 있는 색상별 key 표시)
                 */
                legends={[
                    {
                        anchor: 'bottom-right', // 위치
                        direction: 'row', // item 그려지는 방향
                        justify: false, // 글씨, 색상간 간격 justify 적용 여부
                        translateX: 0, // chart와 X 간격
                        translateY: 52, // chart와 Y 간격
                        itemsSpacing: 10, // item간 간격
                        itemWidth: 80, // item width
                        itemHeight: 18, // item height
                        itemDirection: 'left-to-right', // item 내부에 그려지는 방향
                        itemOpacity: 1, // item opacity
                        symbolSize: 16, // symbol (색상 표기) 크기
                        symbolShape: 'circle', // symbol (색상 표기) 모양
                        effects: [
                            {
                                // 추가 효과 설정 (hover하면 textColor를 olive로 변경)
                                on: 'hover',
                                style: {
                                    itemTextColor: 'olive',
                                },
                            },
                        ],
                        onClick: handle.legendClick, // legend 클릭 이벤트
                    },
                ]}
            />
        </div>
    );
};


// const MyResponsivePie = ({data}:any) => (
//     <ResponsivePie
//         data={[
//             { id: 'total', value: data.totalNum},
//             { id: 'completedNum', value: data.totalCompletedNum},
//             { id: 'unCompletedNum', value: data.totalUncompletedNum},
//         ]}
//         margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
//         innerRadius={0.5}
//         padAngle={0.7}
//         cornerRadius={3}
//         activeOuterRadiusOffset={8}
//         borderWidth={1}
//         borderColor={{
//             from: 'color',
//             modifiers: [
//                 [
//                     'darker',
//                     0.2
//                 ]
//             ]
//         }}
//         arcLinkLabelsSkipAngle={10}
//         arcLinkLabelsTextColor="#333333"
//         arcLinkLabelsThickness={2}
//         arcLinkLabelsColor={{ from: 'color' }}
//         arcLabelsSkipAngle={10}
//         arcLabelsTextColor={{
//             from: 'color',
//             modifiers: [
//                 [
//                     'darker',
//                     2
//                 ]
//             ]
//         }}
//         defs={[
//             {
//                 id: 'dots',
//                 type: 'patternDots',
//                 background: 'inherit',
//                 color: 'rgba(255, 255, 255, 0.3)',
//                 size: 4,
//                 padding: 1,
//                 stagger: true
//             },
//             {
//                 id: 'lines',
//                 type: 'patternLines',
//                 background: 'inherit',
//                 color: 'rgba(255, 255, 255, 0.3)',
//                 rotation: -45,
//                 lineWidth: 6,
//                 spacing: 10
//             }
//         ]}
//         fill={[
//             {
//                 match: {
//                     id: 'totalNum'
//                 },
//                 id: 'dots'
//             },
//             {
//                 match: {
//                     id: 'totalCompletedNum'
//                 },
//                 id: 'dots'
//             },
//             {
//                 match: {
//                     id: 'totalUncompletedNum'
//                 },
//                 id: 'dots'
//             },
//         ]}
//         legends={[
//             {
//                 anchor: 'bottom',
//                 direction: 'row',
//                 justify: false,
//                 translateX: 0,
//                 translateY: 56,
//                 itemsSpacing: 0,
//                 itemWidth: 100,
//                 itemHeight: 18,
//                 itemTextColor: '#999',
//                 itemDirection: 'left-to-right',
//                 itemOpacity: 1,
//                 symbolSize: 18,
//                 symbolShape: 'circle',
//                 effects: [
//                     {
//                         on: 'hover',
//                         style: {
//                             itemTextColor: '#000'
//                         }
//                     }
//                 ]
//             }
//         ]}
//     />
// )
