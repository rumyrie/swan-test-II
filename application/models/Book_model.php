<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Book_model
 * Модель для работы с книгами
 */
class Book_model extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
    }

    public function loadList()
    {
        $query = $this->db->query("SELECT * FROM books");

        $books = [];
        foreach ($query->result_array() as $book) {
            $books[] = array('book_id' => $book['id'],
                'book_name' => $book['name'],
                'author_name' => $book['author'],
                'book_year' => $book['year']);
        }
        return $books;
    }

    public function addBook($data)
    {

        $this->db->insert('books', array(
            'name' => $data['book_name'],
            'author' => $data['author_name'],
            'year' => $data['book_year']
        ));

        return $this->db->affected_rows();
    }

    public function editBook($data)
    {

        $this->db->where('id', $data['book_id']);
        $this->db->update('books', array(
            'name' => $data['book_name'],
            'author' => $data['author_name'],
            'year' => $data['book_year']
        ));

        return $this->db->affected_rows();
    }

    public function deleteBook($data)
    {
        $this->db->where('id', $data['book_id']);
        $this->db->delete('books');

        return $this->db->affected_rows();
    }
}
