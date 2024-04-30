import { Box, Checkbox, Flex, Spacer, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

interface Item {
    id: string;
    task: string;
    createdAt: string
}
const urlAddress: string = (import.meta.env.VITE_URL as string)
const ActiveItem: React.FC = () => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [activeItems, setActiveItems] = useState<Item[]>([]);

    const fetchItems = async () => {
        const response = await fetch(urlAddress);
        const data = await response.json();
        setActiveItems(data)
    }
    useEffect(() => {
        fetchItems();
    }, [])


    const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {

        setIsDisabled(true)
        try {
            if (e.target.checked === true) {
                await fetch(`${urlAddress}/${e.target.value}`, {
                    method: 'DELETE'
                });
                // const data = await response.json();
                // console.log(data);
                fetchItems();
            }
        } catch (error) {
            console.log(error);

        }
        setIsDisabled(false)
    }
    return (
        <div>
            {activeItems.map((item: Item) => (
                <Flex key={item.id} bg={'#FFEAE3'} borderRadius={'md'}>
                    <Box p='4' bg=''>
                        <Checkbox
                            border={'black'}
                            isDisabled={isDisabled}
                            value={item.id}
                            onChange={handleCheck}
                        >
                            {item.task}
                        </Checkbox>
                    </Box>
                    <Spacer />
                    <Box p='4' bg=''>
                        <Text as={'b'}>
                            {item.createdAt}
                        </Text>
                    </Box>
                </Flex>
            ))
            }


        </div >
    )
}

export default ActiveItem

