<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Book
 * Контроллер для работы с книгами
 */
class Book extends CI_Controller {

	/**
	 * Загрузка списка книг
	 */
	public function loadList()
	{
		$this->load->model('Book_model');
		$bookList = $this->Book_model->loadList();
		echo json_encode($bookList);
	}

    /**
     * Добавление книг
     */
	public function addBook()
    {
        $jsonArray = json_decode(file_get_contents('php://input'),true);
        $this->load->model('Book_model');
        $id = $this->Book_model->addBook($jsonArray);
        echo json_encode($id);
    }

    /**
     * Редактирование книг
     */
    public function editBook()
    {
        $jsonArray = json_decode(file_get_contents('php://input'),true);
        $this->load->model('Book_model');
        $result = $this->Book_model->editBook($jsonArray);
        echo json_encode($result);
    }

    /**
     * Удаление книг
     */
    public function deleteBook()
    {
        $jsonArray = json_decode(file_get_contents('php://input'),true);
        $this->load->model('Book_model');
        $result = $this->Book_model->deleteBook($jsonArray);
        echo json_encode($result);
    }

    /**
     * Отправка
     */
    public function downloadXML()
    {
        $this->load->model('Book_model');
        $data = $this->Book_model->loadList();
        $xml = new SimpleXMLElement('<xml/>');
        $books = $xml->addChild('books');

        foreach ($data as $bookData) {
            $book = $books->addChild('book');
            $book->addChild('id', $bookData['book_id']);
            $book->addChild('name',$bookData['book_name']);
            $book->addChild('author',$bookData['author_name']);
        }

        Header('Content-type: text/xml');
        echo($xml->asXML());
    }
}

