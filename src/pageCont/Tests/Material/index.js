import * as React from 'react'
import Head from 'next/head'

import styles from './index.module.scss';
import styled from 'styled-components'

import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'

import Alert from '@mui/material/Alert'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import PhoneIcon from '@mui/icons-material/Phone'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PersonPinIcon from '@mui/icons-material/PersonPin'
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed'

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper'
}

const Title = styled.div`
      font-size: 50px;
      color: ${({ theme }) => theme};
`

export default function Home() {
    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <div className="container">
            <Head>
                <title>我是测试页面</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>我是测试页面</div>
            <Title theme={'red'}>
                <div>哈哈哈</div>
            </Title>

            <Button variant="contained">你好，世界</Button>

            <List sx={style} component="nav" aria-label="mailbox folders">
                <ListItem button>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <Divider />
                <ListItem button divider>
                    <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Trash" />
                </ListItem>
                <Divider light />
                <ListItem button>
                    <ListItemText primary="Spam" />
                </ListItem>
            </List>

            <Alert severity="error">
                This is an error alert — check it out!
            </Alert>
            <Alert severity="warning">
                This is a warning alert — check it out!
            </Alert>
            <Alert severity="info">This is an info alert — check it out!</Alert>
            <Alert severity="success">
                This is a success alert — check it out!
            </Alert>

            <div className={styles.color}>颜色</div>

            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="icon position tabs example"
            >
                <Tab icon={<PhoneIcon />} label="top" />
                <Tab
                    icon={<PhoneMissedIcon />}
                    iconPosition="start"
                    label="start"
                />
                <Tab icon={<FavoriteIcon />} iconPosition="end" label="end" />
                <Tab
                    icon={<PersonPinIcon />}
                    iconPosition="bottom"
                    label="bottom"
                />
            </Tabs>
        </div>
    )
}
