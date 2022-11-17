// isi inputan berisi 
//  nama buku, kategori buku, tahun terbit, nama penulis, rak nomor 

// test case
// ketika nama buku tidak di isi maka akan muncul pesan => nama buku harus di isi
// ketika kategori buku tidak di isi maka akan muncul pesan => Kategori buku harus di isi
// ketika tahun terbit buku tidak di isi maka akan muncul pesan => tahun terbit buku harus di isi
// ketika nama penulis buku tidak di isi maka akan muncul pesan => nama penulis buku harus di isi
// ketika rak buku tidak di isi maka akan muncul pesan => nama rak buku harus di isi
import { Home } from "./index"
import { MasterBooks } from "./models";

export const home = new Home()

describe("AddBooks",() =>{
    const addBookParam:MasterBooks = {
        name_book:"Sejarah Doraemon",
            category:"Sejarah",
            years:2011,
            name_writer:"Sutiono",
            rak_book:10,
    }
    it("should be throw error when name is empty",async () =>{
        const books ={} as any

        const findByProductIdMock = jest.spyOn(home, 'addBooks')
          .mockResolvedValueOnce({ 
            ...addBookParam});
            // const consoleErrorSpy = jest.spyOn(console, "error");
            //...do your test...
            // consoleErrorSpy.mockRestore();
            console.log(findByProductIdMock)
        // const checkAddsBooks = jest
        //   .spyOn(home, 'addBooks')
        //   .mockRejectedValueOnce(
        //     new Error(
        //       'req body empty'
        //     )
        //   );
        // expect(checkAddsBooks).toHaveBeenCalled();
        // expect(checkAddsBooks).toHaveBeenCalledWith(addBookParam);
        // await expect(() => home.addBooks(addBookParam)).rejects.toThrow("req body empty");
    })

});