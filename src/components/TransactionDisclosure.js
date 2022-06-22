import { Disclosure } from "@headlessui/react";
import { Icon } from "@iconify/react";

export default function TransactionDisclosure({status, total, bank, va_number, deadline}) {
  return (
    <Disclosure as="div" className="p-3 border-[1px] rounded-md border-gray-300">
      {({ open }) => (
        <>
          <Disclosure.Button className="w-full font-medium flex items-center justify-between">
            <p>Detail Transaksi</p>
            <Icon
              icon="charm:chevron-down"
              className={`${open ? "transform rotate-180" : ""} transition-all duration-200 ease-out`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="text-sm text-gray-700 my-1 flex flex-col gap-1">
            <p>Status: {status}</p>
            <p>Jumlah: {total}</p>
            <p>Bank: {bank}</p>
            <p>No Rek: {va_number}</p>
            <p>Deadline: {deadline}</p>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
