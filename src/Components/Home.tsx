import { Tabs, TabList, TabPanels, Tab, TabPanel, Card, CardBody, Text, Container } from '@chakra-ui/react'
import React from 'react'
import AddTask from './AddTask'
import ActiveItem from './ActiveItem'
const Home: React.FC = () => {
  return (
    <div>
      <Container maxW='2xl' centerContent pt={'50'} >


        <Card pl={10} pr={10} boxShadow='outline' minWidth={'700px'}>
          <CardBody>
            <Text fontSize='5xl' textAlign={'center'}>TODO List</Text>

            <Tabs align='center' variant='soft-rounded'>
              <TabList >
                <Tab>Add Task</Tab>
                <Tab>List</Tab>
              </TabList>

              <TabPanels>
                <TabPanel pl={0}>
                  <AddTask />
                </TabPanel>
                <TabPanel>
                  <ActiveItem />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}

export default Home