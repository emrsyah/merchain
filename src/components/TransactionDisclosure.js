import { Disclosure } from "@headlessui/react";
import { Icon } from "@iconify/react";

export default function TransactionDisclosure({status, total, bank, va_number}) {
  return (
    <Disclosure as="div" className="p-3 bg-purple-200 border-[1px] rounded-md border-purple-700 text-purple-600">
      {({ open }) => (
        <>
          <Disclosure.Button className="w-full font-medium flex items-center justify-between">
            <p>Detail Transaksi</p>
            <Icon
              icon="charm:chevron-down"
              className={`${open ? "transform rotate-180" : ""}`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="text-sm text-purple-700 my-1 flex flex-col gap-[2px]">
            <p>Status: {status}</p>
            <p>Jumlah: {total}</p>
            <p>Bank: {bank}</p>
            <p>No Rek: {va_number}</p>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
