```c
/*
 * Sample 1
 */

#include <stdlib.h>
#include <assert.h>


struct book {
    char title[10];
    struct book* next;
    struct book* prev;
};

struct books {
    struct book* head, *tail;
};

void insert_after(struct books* books, struct book* book, struct book* newNode)
{
    assert(newNode->prev == NULL);
    assert(newNode->next == NULL);

    newNode->prev = book;
    if (book->next == NULL) {        
        books->tail = newNode;
    }
    else {
        newNode->next = book->next;
        book->next->prev = newNode;
    }
    book->next = newNode;
}

void insert_before(struct books* list, struct book* node, struct book* newNode)
{
    assert(newNode->prev == NULL);
    assert(newNode->next == NULL);

    newNode->next = node;
    if (node->prev == NULL)
    {
        newNode->prev = NULL;// --(not always necessary)
        list->head = newNode;
    }
    else
    {
        newNode->prev = node->prev;
        node->prev->next = newNode;

    }
    node->prev = newNode;

}

void insert_beginning(struct books* list, struct book* newNode)
{
    assert(newNode->prev == NULL);
    assert(newNode->next == NULL);

    if (list->head == NULL)
    {
        list->head = newNode;
        list->tail = newNode;
    }
    else
    {
        newNode->next = list->head;
        list->head = newNode;
        list->head->prev = newNode;
    }
}

void insert_end(struct books* list, struct book* newNode)
{
    assert(newNode->prev == NULL);
    assert(newNode->next == NULL);

    if (list->tail == NULL)
    {
        list->head = newNode;
        list->tail = newNode;
    }
    else
    {
        newNode->prev = list->tail;
        list->tail = newNode;
        list->tail->next = newNode;
    }
}

void remove_and_free(struct books* list, struct book* node)
{
    if (node->prev == NULL)
        list->head = node->next;
    else
        node->prev->next = node->next;

    if (node->next == NULL)
        list->tail = node->prev;
    else
        node->next->prev = node->prev;

    free(node);
}



void books_destroy(struct books* books)
{
    //pre condition
    assert(books != NULL);

    struct book* it = books->head;
    while (it != NULL)
    {
        struct book* next = it->next;
        free(it);
        it = next;
    }
}

#define try if (1)
#define throw goto CATCH_BLOCK
#define catch else CATCH_BLOCK:

int main(int argc, char* argv[])
{
    struct books list = { 0 };
    struct book* b1 = NULL;
    struct book* b2 = NULL;
    try
    {
        b1 = calloc(1, sizeof(struct book));
        if (b1 == NULL) throw;
        insert_end(&list, b1);

        b2 = calloc(1, sizeof(struct book));
        if (b2 == NULL) throw;
        insert_end(&list, b2);
    }
    catch {
    }


    books_destroy(&list);
}

```

