<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Book_model
 * Модель для работы с книгами
 */
class Book_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
        //$this->db->get();
    }

    public function loadList()
	{
	    $query = $this->db->query("SELECT * FROM books");

	    $books = [];
	    foreach ($query->result_array() as $book)
        {
            $books[] = array('book_id' => $book['id'],
                'book_name' => $book['name'],
                'author_name' => $book['author'],
                'book_year' => $book['year']);
        }
        return $books;
/*		return array(
			array('book_id' => 1, 'book_name' => 'Евгений Онегин', 'author_name' => 'Пушкин А.С.', 'book_year' => 1833),
			array('book_id' => 2, 'book_name' => 'Война и мир', 'author_name' => 'Толстой Л.Н.', 'book_year' => 1869),
			array('book_id' => 3, 'book_name' => 'Анна Каренина', 'author_name' => 'Толстой Л.Н.', 'book_year' => 1877)
		);*/
	}
}
