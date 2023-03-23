```c
#include <stdlib.h>
#include <assert.h>
#include <errno.h>

struct book {
     char* title;
     struct book* next;
};

void book_destroy(struct book* book) {
     free(book->title);
 }
 

struct books {
    struct book* head, *tail;
};

void books_insert_after(struct books* books, struct book* book, struct book* new_book)
{
    assert(books != NULL);
    assert(book != NULL);
    assert(new_book != NULL);
    assert(new_book->next == NULL);


    if (book->next == NULL) {
        books->tail = new_book;
    }
    else {
        new_book->next = book->next;
    }

    book->next = new_book;
}



void books_push_back(struct books* books, struct book* new_book)
{
    assert(books != NULL);
    assert(new_book != NULL);
    assert(new_book->next == NULL);

    if (books->tail == NULL) {
        books->head = new_book;
    }
    else {
        books->tail->next = new_book;
    }
}

void books_push_front(struct books* books, struct book* new_book)
{
    assert(books != NULL);
    assert(new_book != NULL);
    assert(new_book->next == NULL);

    if (books->head == NULL) {
        books->head = new_book;
        books->tail = new_book;
    }
    else {
        new_book->next = books->head;        
        books->head = new_book;
    }
}

void books_destroy(struct books* books)
{
    //pre condition
    assert(books != NULL);

    struct book* it = books->head;
    while (it != NULL) {
        struct book* next = it->next;
        book_destroy(it);
        free(it);
        it = next;
    }
}

int main(int argc, char* argv[])
{
    struct books list = { 0 };
    struct book* b1 = calloc(1, sizeof(struct book));
    if (b1)
    {
        books_push_front(&list, b1);
    }
    books_destroy(&list);
}
```
