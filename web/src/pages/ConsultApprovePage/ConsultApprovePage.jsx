import {useEffect, useMemo, useState} from 'react';
import styles from './ConsultHistory.module.css';
import {getConsultingList, getConsultingMessage, getConsults} from '../../api/ConsultingAPI/consultingAPI';
import styles2 from "../ManageClassPage/ManageMyclassPage.module.css";
import Table from "../../component/Table/Table";

export default function ConsultApprovePage() {
  const [consults, setConsults] = useState([]);
  const [totalConsults, setTotalConsults] = useState(0);

  useEffect(() => {
    fetchConsults(5001);
  }, []);

  const fetchConsults = async (pageIdx) => {
    try {
      const data = await getConsults(pageIdx);
      if (data && Array.isArray(data.content)) {
        const transformedData = data.content.map((consult) => ({
          type: consult.type,
          grade: consult.parentInfo.split(' ')[0],
          class: consult.parentInfo.split(' ')[1],
          number: consult.parentInfo.split(' ')[2],
          name: consult.parentInfo.split(' ')[3],
          relationship: consult.parentInfo.split(' ')[4] === '아버님' ? '부' : '모',
          lastModifiedDate: consult.lastModifiedDate.split('T')[0] + ' ' + consult.lastModifiedDate.split('T')[1],
          // add other fields if necessary
        }));
        setConsults(transformedData);
        setTotalConsults(data.count);
      } else {
        // handleRetry();
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  }

  const columns = useMemo(
    () => [
      {
        accessor: 'type',
        Header: '상담 유형'
      },
      {
        accessor: 'grade',
        Header: '학년'
      },
      {
        accessor: 'class',
        Header: '반'
      },
      {
        accessor: 'number',
        Header: '번호'
      },
      {
        accessor: 'name',
        Header: '학생 이름'
      },
      {
        accessor: 'relationship',
        Header: '관계'
      },
      {
        accessor: 'lastModifiedDate',
        Header: '신청 일자'
      },
      {
        accessor: 'approve',
        Header: '승인'
      },
      {
        accessor: 'reject',
        Header: '거절'
      }
    ],
    []
  );

  return (
    <div className={styles.consultHistory}>
      <div className={styles.title}>
        <p>상담 확인</p>
        <p>상담 대기 : {totalConsults}건 </p>
      </div>
      <div className={styles.consultClass}>
        <div className={styles2.scrollContainer}>
          <Table columns={columns} data={consults}/>
        </div>
      </div>
    </div>
  );
}
