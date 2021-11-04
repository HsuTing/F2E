import React from 'react';
import { Button } from 'antd';

import styles from './styles/index.module.scss';

const Home = () => <Button className={styles.root}>Home</Button>;

export default React.memo(Home);
