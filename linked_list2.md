[Main](README.md) > [Linked lists](linked_lists.md) > [Singly Linked lists](singlylinkedlist.md) > Sample 3

```c
/*
* Sample 3
*/

#include <stdlib.h>
#include <assert.h>
#include <string.h>
#include <stdio.h>
#include <errno.h>
#include <stdbool.h>

struct book {
    char title[10];
};

struct book_list_node {
    struct book book;
    struct book_list_node* next;
};

struct books {
    struct book_list_node* head, *tail;
};

int books_append(struct books* books, struct book* book)
{
    //pre condition
    assert(books != NULL);
    assert(book != NULL);

    struct book_list_node* node = calloc(1, sizeof * node);
    if (node == NULL) return ENOMEM;

    node->book = *book;

    if (books->head == NULL) {
        books->head = node;
        books->tail = node;
    }
    else {
        books->tail->next = node;
        books->tail = node;
    }
    return 0;
}

/*alternative insert*/
int books_append_title(struct books* books, const char* title)
{
    //pre condition
    assert(books != NULL);
    assert(title != NULL);

    struct book_list_node* node = calloc(1, sizeof(struct book_list_node));
    if (node == NULL) return ENOMEM;

    if (snprintf(node->book.title, sizeof node->book.title, "%s", title) >= sizeof node->book.title)
    {
        free(node);
        return ERANGE; /*title too big*/
    }

    if (books->head == NULL) {
        books->head = node;
        books->tail = node;
    }
    else {
        books->tail->next = node;
        books->tail = node;
    }

    return 0;
}


void book_list_destroy(struct books* books)
{
    //pre condition
    assert(books != NULL);

    struct book_list_node* it = books->head;
    while (it != NULL) {
        struct book_list_node* next = it->next;
        free(it);
        it = next;
    }
}


int main(int argc, char* argv[])
{
    struct books list = { 0 };

    struct book book = { .title = "book1" };
    if (books_append(&list, &book /*COPIED*/) != 0)
    {
        assert(false); //ops
    }

    /*alternative insert*/
    if (books_append_title(&list, "book 2") != 0)
    {
        assert(false); //ops
    }

    book_list_destroy(&list);
}
```
