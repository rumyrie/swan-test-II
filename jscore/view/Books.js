Ext.define('Swan.view.Books', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bookList',
    store: {
        proxy: {
            type: 'ajax',
            url: 'index.php/Book/loadList',
            reader: {
                type: 'json',
                idProperty: 'book_id'
            }
        },
        autoLoad: true,
        remoteSort: false,
        sorters: [{
            property: 'book_name',
            direction: 'ASC'
        }]
    },
    defaultListenerScope: true,
    tbar: [
        {
            text: 'Добавить',
            handler: function () {
                Ext.create('Books.AddForm').show();
            }
        }, {
            text: 'Редактировать',
            handler: function () {
                var grid = Ext.ComponentQuery.query('bookList')[0];
                var selectedRecord = grid.getSelection()[0];
                if (typeof selectedRecord === 'undefined') {
                    Ext.Msg.alert('Info', 'Книга не выбрана');
                    return;
                }
                Ext.create('Books.EditForm').show();
            }
        }, {
            text: 'Удалить',
            handler: function () {
                var grid = Ext.ComponentQuery.query('bookList')[0];
                var selectedRecord = grid.getSelection()[0];
                if (typeof selectedRecord === 'undefined') {
                    Ext.Msg.alert('Info', 'Книга не выбрана');
                    return;
                }
                var data = selectedRecord.data;
                Ext.Msg.confirm('Удалить книгу',
                    'Вы уверены, что хотите удалить книгу?',
                    function (button) {
                        if (button === 'yes') {
                            Ext.Ajax.request({
                                url: 'index.php/Book/deleteBook',
                                method: 'POST',
                                jsonData: data,
                                success: function (response) {
                                    grid.getStore().load();
                                }
                            });
                        }
                    });
            }
        }, {
            text: 'Экспорт в XML',
            handler: function () {
                Ext.create('Ext.form.Panel', {
                    renderTo: Ext.getBody(),
                    standardSubmit: true,
                    url: 'index.php/Book/downloadXML'
                }).submit({params: {}});
                }
        }],
    columns: [
        {
            dataIndex: 'author_name',
            text: 'Автор',
            width: 150
        }, {
            dataIndex: 'book_name',
            text: 'Название книги',
            flex: 1
        }, {
            dataIndex: 'book_year',
            text: 'Год издания',
            width: 150
        }]
});
Ext.define('Books.AddForm', {
    extend: 'Ext.window.Window',
    bodyPadding: 10,
    modal: true,
    buttonAlign: 'center',
    closable: true,
    items: [
        {
            xtype: 'textfield',
            name: 'new_book_name',
            fieldLabel: 'Название книги',
            allowBlank: false,
        },
        {
            xtype: 'textfield',
            name: 'new_author_name',
            fieldLabel: 'Автор',
            allowBlank: false,
        },
        {
            xtype: 'textfield',
            name: 'new_book_year',
            fieldLabel: 'Год выпуска',
            allowBlank: false,
        }
    ],
    buttons: [
        {
            text: 'OK',
            handler: function () {
                var name = Ext.ComponentQuery.query('[name=new_book_name]')[0].rawValue;
                var author = Ext.ComponentQuery.query('[name=new_author_name]')[0].rawValue;
                var year = Ext.ComponentQuery.query('[name=new_book_year]')[0].rawValue;
                if (name.length === 0 || author.length === 0 || year.length === 0) {
                    Ext.Msg.alert('Добавление', 'Необходимо заполнить все поля');
                    return;
                }
                var data = {
                    'book_name': name,
                    'author_name': author,
                    'book_year': year
                };
                Ext.Ajax.request({
                    url: 'index.php/Book/addBook',
                    method: 'POST',
                    jsonData: data,
                    success: function (response) {
                        var grid = Ext.ComponentQuery.query('bookList')[0];
                        grid.getStore().load();
                    }
                });
                this.up('window').close();
            }
        }, {
            text: 'Cancel',
            handler: function () {
                this.up('window').close();
            }
        }
    ]
});

Ext.define('Books.EditForm', {
    extend: 'Ext.window.Window',
    bodyPadding: 10,
    modal: true,
    buttonAlign: 'center',
    closable: true,
    items: [
        {
            xtype: 'textfield',
            name: 'edited_book_id',
            fieldLabel: 'ID книги',
            allowBlank: false,
            readOnly: true
        },
        {
            xtype: 'textfield',
            name: 'edited_book_name',
            fieldLabel: 'Название книги',
            allowBlank: false
        },
        {
            xtype: 'textfield',
            name: 'edited_author_name',
            fieldLabel: 'Автор',
            allowBlank: false
        },
        {
            xtype: 'textfield',
            name: 'edited_book_year',
            fieldLabel: 'Год выпуска',
            allowBlank: false
        }
    ],
    initComponent: function () {
        var grid = Ext.ComponentQuery.query('bookList')[0];
        var selectedRecord = grid.getSelection()[0];
        var data = selectedRecord.data;
        this.items[0].rawValue = data['book_id'];
        this.items[1].rawValue = data['book_name'];
        this.items[2].rawValue = data['author_name'];
        this.items[3].rawValue = data['book_year'];
        this.callParent(arguments);
    },
    buttons: [
        {
            text: 'OK',
            handler: function () {
                var id = Ext.ComponentQuery.query('[name=edited_book_id]')[0].rawValue;
                var name = Ext.ComponentQuery.query('[name=edited_book_name]')[0].rawValue;
                var author = Ext.ComponentQuery.query('[name=edited_author_name]')[0].rawValue;
                var year = Ext.ComponentQuery.query('[name=edited_book_year]')[0].rawValue;
                if (name.length === 0 || author.length === 0 || year.length === 0) {
                    Ext.Msg.alert('Добавление', 'Необходимо заполнить все поля');
                    return;
                }
                var data = {
                    'book_id': id,
                    'book_name': name,
                    'author_name': author,
                    'book_year': year
                };
                Ext.Ajax.request({
                    url: 'index.php/Book/editBook',
                    method: 'POST',
                    jsonData: data,
                    success: function (response) {
                        var grid = Ext.ComponentQuery.query('bookList')[0];
                        grid.getStore().load();
                    }
                });
                this.up('window').close();
            }
        }, {
            text: 'Cancel',
            handler: function () {
                this.up('window').close();
            }
        }
    ]
});