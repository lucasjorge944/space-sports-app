import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Box } from '@/components/ui/box';
import { Divider } from '@/components/ui/divider';
import { ScrollView } from '@/components/ui/scroll-view';
import { VStack } from '@/components/ui/vstack';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react-native';
import React from 'react';
import { PageHeader } from '../components/PageHeader';
import PIX from './components/PIX';

const MOCK_SPACES_PAYMENT_METHODS = [
  {
    id: '1',
    name: 'Astral Beach Sports',
    payment: {
      method: 'PIX',
      keys: [
        { key: '1234567890', owner: 'Astral Beach Sports' },
        { key: '1234567890', owner: 'Gabriel Goiano' },
      ],
    },
  },
  {
    id: '2',
    name: 'Arena Errejota',
    payment: {
      method: 'PIX',
      keys: [{ key: '56753246766', owner: 'Arena Errejota' }],
    },
  },
];

export default function PaymentMethods() {
  return (
    <Box className="flex-1 bg-gray-50">
      <PageHeader title="Métodos de Pagamento" showBackButton />
      <ScrollView className="flex-1">
        <VStack className="p-4" space="md">
          <Accordion
            type="multiple"
            variant="filled"
            size="md"
            className="w-full"
          >
            {MOCK_SPACES_PAYMENT_METHODS.map((space, index) => (
              <React.Fragment key={space.id}>
                {index > 0 && <Divider />}
                <AccordionItem value={space.id}>
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }: { isExpanded: boolean }) => (
                        <>
                          <AccordionTitleText>{space.name}</AccordionTitleText>
                          <AccordionIcon
                            as={isExpanded ? ChevronUpIcon : ChevronDownIcon}
                            className="ml-3"
                          />
                        </>
                      )}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    {space.payment.method === 'PIX' && (
                      <PIX keys={space.payment.keys} />
                    )}
                  </AccordionContent>
                </AccordionItem>
              </React.Fragment>
            ))}
          </Accordion>
        </VStack>
      </ScrollView>
    </Box>
  );
}
