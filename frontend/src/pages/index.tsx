import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-screen main-color">
      {/* container */}
      <div className="flex flex-col p-6 gap-y-3 flex-1 min-h-0">
        {/* create item */}
        <div className="flex w-full rounded-md p-2 justify-end items-end second-color">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Create Polis</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <div className="flex gap-x-2">
                  <Input placeholder="Nomor Polis" />
                  <Input placeholder="Nama Tertanggung" />
                </div>
                <div className="flex gap-x-2">
                  <Input placeholder="Tanggal Efektif" />
                  <Input placeholder="Tanggal Expired" />
                </div>
                <div className="flex gap-x-2">
                  <Input placeholder="Merek Kendaraan" />
                  <Input placeholder="Tipe Kendaraan" />
                </div>
                <div className="flex gap-x-2">
                  <Input placeholder="Tahun Kendaraan" />
                  <Input placeholder="Harga Kendaraan" />
                </div>
                <div className="flex gap-x-2">
                  <Input placeholder="Rate Premi" />
                  <Input placeholder="Harga Premi" />
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Create</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* table */}
        <div className="flex flex-1 min-h-0 p-2 rounded-md second-color overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#242322] rounded-t-md text-[#fafafa]">
                <TableHead className="w-1/7 text-[#fafafa] text-center rounded-tl-md">
                  No Polis
                </TableHead>
                <TableHead className="w-1/7 text-[#fafafa] text-center">
                  Nama Tertanggung
                </TableHead>
                <TableHead className="w-1/7 text-[#fafafa] text-center">
                  Periode
                </TableHead>
                <TableHead className="w-1/7 text-[#fafafa] text-center">
                  Nama Item
                </TableHead>
                <TableHead className="w-1/7 text-[#fafafa] text-center">
                  Harga Pertanggungan
                </TableHead>
                <TableHead className="w-1/7 text-[#fafafa] text-center">
                  Harga Premi
                </TableHead>
                <TableHead className="w-1/7 text-[#fafafa] text-center rounded-tr-md">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">test</TableCell>
                <TableCell className="text-center">test</TableCell>
                <TableCell className="text-center">test</TableCell>
                <TableCell className="text-center">test</TableCell>
                <TableCell className="text-center">test</TableCell>
                <TableCell className="text-center">test</TableCell>
                <TableCell>
                  <div className="gap-x-1 flex justify-center items-center">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <div className="bg-[#53BF9D] text-[#fafafa] rounded-md p-1 cursor-pointer">
                          <Pencil className="w-5 h-5" />
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <div className="flex gap-x-2">
                            <Input placeholder="Nomor Polis" />
                            <Input placeholder="Nama Tertanggung" />
                          </div>
                          <div className="flex gap-x-2">
                            <Input placeholder="Tanggal Efektif" />
                            <Input placeholder="Tanggal Expired" />
                          </div>
                          <div className="flex gap-x-2">
                            <Input placeholder="Merek Kendaraan" />
                            <Input placeholder="Tipe Kendaraan" />
                          </div>
                          <div className="flex gap-x-2">
                            <Input placeholder="Tahun Kendaraan" />
                            <Input placeholder="Harga Kendaraan" />
                          </div>
                          <div className="flex gap-x-2">
                            <Input placeholder="Rate Premi" />
                            <Input placeholder="Harga Premi" />
                          </div>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Update</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <div className="bg-[#F94C66] text-[#fafafa] rounded-md p-1 cursor-pointer">
                          <Trash className="w-5 h-5" />
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-[#F94C66] hover:bg-[#F94C66]/80 text-white">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// bg-[#f5f4f2]
